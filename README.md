# ac:
编写一个左右布局的页面, 左边分配多一些的空间, 右边分配少一些的空间.
1.在左边的空间内展示一个 google map, 并将默认位置定位到成都; 页面右边的空间将被用来展示一个列表和一个按钮; 要求至少使用两个不同的组件, 一个组件用来放置 google map, 一个组件用来放置列表和按钮.
2.在右边组件的顶部放置一个按钮, 点击按钮会在google map 上面随机生成5000个marker, 每个marker会被分配一个id(比如自增id); 同时会在列表中以id为行记录呈现这些marker, 左键单击某行记录可将地图中心点设置为对应marker的坐标.
3.鼠标在 google map 上点击右键可根据刚刚生成的一系列 markers 在地图上生成一个 polygon, 并清除所有的 marker以及列表中的记录.
4.在 google map 上添加 1 个按钮, 这个按钮可以改变刚刚生成的 polygon 的 fill color, 任意填充一个颜色就行.
5.按照您自己心中比较好的用户体验来处理该页面的响应式布局(可以用任意布局方式).
6.(加分项)在邮件中可以找到AUS_zone.shp文件, 请分析这个文件, 并在页面右边空间提供一个file input, 用户通过file input选中该文件后, 将文件内的数据展示到 google map 上.

# task
- flex左右布局，左侧操作右侧地图展示，MapLayout
- GoogleMap,展示地图默认定位成都
- MarkerList,点击按钮随机生成
- 单击marker选项，设置地图中心坐标
- 地图右击生成polygon，并清空list数据
- 填充颜色的button
- 导入文件并解析