import './index.css'
import { Layout } from './layout/Layout'
import { Reasoning } from './assignment/Reasoning'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ExamPage } from './components/ExamPage'
import { ResultPage } from './components/ResultPage'
import { Home } from './pages/Home'
import { English } from './assignment/English'
import { NumericalAbility } from './assignment/NumericalAbility'
import { GeneralAwarness } from './assignment/GeneralAwarness'
import { MyAccount } from './pages/MyAccount'

export const  App=()=> {
const router=createBrowserRouter( 
[ 
{ 
path:"/", 
element:<Layout/>, 
children:[ 
{ 
path:"/reasoning", 
element:<Reasoning/> 
},
{ 
path:"/english", 
element:<English/> 
},
{ 
path:"/maths", 
element:<NumericalAbility/> 
},
{ 
path:"/ga", 
element:<GeneralAwarness/> 
},
{ 
path:"/", 
element:<Home/> 
}
,
{ 
path:"/exampage", 
element:<ExamPage/> 
}
,
{ 
path:"/profile", 
element:<MyAccount/> 
},
{ 
path:"/resultpage", 
element:<ResultPage/> 
}
]}

])


  return (
   <RouterProvider router={router} /> 
  )
}



