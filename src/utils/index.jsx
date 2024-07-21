
import { Spin } from 'antd';
import { Suspense } from "react"

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
export { SuspenseElement }