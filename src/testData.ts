export interface PostProps {
  id: number
  title: string
  content: string
  image?: string
  createdAt: string
  columnId: number
}
export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  description: string
}
export const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'https://img0.baidu.com/it/u=1075646144,266370573&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'https://img2.baidu.com/it/u=3838008341,1789189214&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'https://img2.baidu.com/it/u=94899473,1482746242&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
  }
]

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    content:
      'this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif',
    image:
      'https://img0.baidu.com/it/u=1075646144,266370573&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
    createdAt: '2022-06-22 23:25:59',
    columnId: 1
  },
  {
    id: 2,
    title: 'test1的专栏',
    content:
      'this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif',
    createdAt: '2022-06-22 23:25:59',
    columnId: 2
  },
  {
    id: 3,
    title: 'test1的专栏',
    content:
      'this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif',
    image:
      'https://img2.baidu.com/it/u=3838008341,1789189214&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    createdAt: '2022-06-22 23:25:59',
    columnId: 3
  }
]
