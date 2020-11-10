import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import axios from '@/utils/axios'
import { translateMarkdown } from '@/utils'
import dayjs from '@/utils/dayjs'
import AppAvatar from '@/components/Avatar'
import { Comment, Button, Tooltip, Input, Icon, Popconfirm, message } from 'antd'

const { TextArea } = Input

function CommentItem(props) {
  const { children, item, userInfo, articleId, commentId, replyId, replyVisible } = props
  const { user } = item
  const [value, setValue] = useState('')

  // useEffect依赖参数replyVisible的变化而执行内部回调
  useEffect(() => {
    replyVisible && setValue('')
  }, [replyVisible])

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleKeyUp(e) {
    if (e.ctrlKey && e.keyCode === 13) {
      onSubmit()
    }
  }

  // 增加评论
  function onSubmit() {
    if (!userInfo.userId) return message.warn('您未登陆，请登录后再试。')
    axios
      .post('/discuss', {
        userId: userInfo.userId,
        articleId,
        content: value.trim(),
        commentId
      })
      .then(res => {
        props.onReply({ commentId: 0, replyId: 0 })
        props.setCommentList(res.rows)
      })
  }

  // 删除评论
  function onDelete() {
    if (replyId) {
      // axios也是直接融入到业务组件中
      axios.delete(`/discuss/reply/${replyId}`).then(() => {
        const commentList = [...props.commentList]
        const tagetComment = commentList.find(c => c.id === commentId)
        tagetComment.replies = tagetComment.replies.filter(r => r.id !== replyId)
        props.setCommentList(commentList)
      })
    } else {
      axios.delete(`/discuss/comment/${commentId}`).then(() => {
        let commentList = [...props.commentList]
        commentList = commentList.filter(c => c.id !== commentId)
        props.setCommentList(commentList)
      })
    }
  }

  function handleReply() {
    props.onReply({ commentId, replyId })
  }

  return (
    // AD评论组件
    <Comment
      actions={[
        <span onClick={handleReply}>Reply to</span>,
        <>
          {userInfo.role === 1 && (
            <Popconfirm title={'是否删除该留言？'} cancelText='取消' okText='确认' onConfirm={onDelete}>
              {/* 显示删除按钮 */}
              <Icon type='delete' className='icon-delete' />
            </Popconfirm>
          )}
        </>
      ]}
      // 名称
      author={<span>{user && user.username}</span>}
      // 头像
      avatar={<AppAvatar userInfo={user} />}
      // 展示的内容
      content={
        <div className='article-detail' dangerouslySetInnerHTML={{ __html: translateMarkdown(item.content, true) }} />
      }
      // 评论日期
      datetime={
        <Tooltip title={item.createdAt}>
          <span>{dayjs(item.createdAt).fromNow()}</span>
        </Tooltip>
      }>
      {/* 回复评论 */}
      {replyVisible && (
        <div className='reply-form'>
          <TextArea
            placeholder={`回复${item.user.username}...`}
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <div className='reply-form-controls'>
            <span className='tip'>Ctrl or ⌘ + Enter</span>
            <Button htmlType='submit' type='primary' disabled={!value.trim()} onClick={onSubmit}>
              回复
            </Button>
          </div>
        </div>
      )}
      {children}
    </Comment>
  )
}

const CommentList = props => {
  const userInfo = useSelector(state => state.user)
  const { commentList, articleId } = props
  const [replyTarget, setReplyTarget] = useState({ commentId: 0, replyId: 0 })

  return (
    <div className='discuss-list'>
      {commentList.map(comment => (
        <CommentItem
          item={comment}
          key={comment.id}
          articleId={articleId}
          userInfo={userInfo}
          commentId={comment.id}
          setCommentList={props.setCommentList}
          commentList={props.commentList}
          onReply={setReplyTarget}
          replyVisible={replyTarget.commentId === comment.id && !replyTarget.replyId}>

          {/* 子评论区UI */}
          {comment.replies.map(reply => (
            <CommentItem
              item={reply}
              key={reply.id}
              articleId={articleId}
              userInfo={userInfo}
              commentId={comment.id}
              replyId={reply.id}
              setCommentList={props.setCommentList}
              commentList={props.commentList}
              onReply={setReplyTarget}
              replyVisible={replyTarget.commentId === comment.id && replyTarget.replyId === reply.id}
            />
          ))}
        </CommentItem>
      ))}
    </div>
  )
}

export default CommentList
