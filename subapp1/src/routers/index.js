import HelloCar from '@/components/HelloCar'
import HelloHot from '@/components/HelloHot'
import HelloInner from '@/components/HelloInnerRoute'
const routers = [
  {
    path: '/',
    redirect: '/car',
  },
  {
    path: '/car',
    component: HelloCar,
    name: 'HelloCar',
  },
  {
    path: '/hot',
    component: HelloHot,
    name: 'HelloHot',
  },
  {
    path: '/inner',
    component: HelloInner,
  },
]

export default routers
