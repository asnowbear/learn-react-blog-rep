
# 应用解刨总结

## 一、前端

### 框架层面

#### 工程组织架构

- layout

  应用的UI框架

- view
  
  框架下的组件

- component

  公共使用(>2的引用)的组件包

#### 1、使用到的antd组件

- Layout (布局)

  UI框架布局

- BackTop（返回页面头部）

  主要是快捷回到页面开始处（滚动条为0的地方）

- Input (输入框)

- Tag (标签)

  带颜色标签显示效果

  本工程：sidebar显示的标签 ArticleTag组件和Arcticle组件使用

- Icon (图标)

  antd内置按钮图标

- Divider (分割线)

  一般作为内容面板的标题

- Menu (菜单)

  header中的菜单，首页、归档、分类、关于

- Drawer（抽屉效果)

  点击显示收缩内容面板

  本工程： QiuckLink的使用，当窗口<1300px时，显示图标，点击后展开快速导航窗口

- Empty (空状态)
  
  暂无数据的空状态

  本工程：文章检索结果为空，显示为空的界面

- Spin (加载中)
  
  在内容还没有显示之前，出现加载中的动画。

  本工程：文章检索，在检索结果出来之前显示等待

#### 2、工程使用的hooks

- useState

- useHistory

 从代码来控制路由跳转

- useLocation

 获取浏览器地址栏对象，用于截取地址栏url地址和对应参数

- useMemo

- useMediaQuery

 本质是使用window.mathMedia(queryString)来返回媒体查询的结果列表，常常用语判断屏幕窗口的大小

 AppMain中使用后判断是否为苹果手机、平板设备的分辨率

 [Window matchMedia() 方法](https://www.runoob.com/jsref/met-win-matchmedia.html)

## 二、后端

## 三、工程化



