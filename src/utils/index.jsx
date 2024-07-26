import { Spin , Typography } from 'antd';
import { Suspense } from "react"
const {Title} = Typography
const Loading = () => {

     return (
          <div className='w-full h-screen flex items-center justify-center'>
              <Spin tip="Loading...">
               </Spin>
          </div>
     )
}

const SuspenseElement = ({children}) => {
     return <Suspense fallback={Loading}> {children}  </Suspense>
}


const ContentTitle = ({children}) => {
     return <Title level={3}>{children}</Title>
}
export { SuspenseElement, ContentTitle, Loading }