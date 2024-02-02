import { AppContext } from '@/components/common/Helpers/Context/AppContext';
import '@/styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material';
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const roboto = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap'
})

function AppContexts(props: any) {
  const [globalData, setGlobalData] = useState({});

  useEffect(() => {
    let context = localStorage.getItem("context");
    if (context) {
      setGlobalData(JSON.parse(context))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("context", JSON.stringify(globalData));
  }, [globalData])

  return (
    <AppContext.Provider value={{ globalData, setGlobalData }}>
      {props.children}
    </AppContext.Provider>
  );
}
// function AppContext(props: any) {
//   const [message, setMessage] = useState({});

//   useEffect(() => {
//     let context = localStorage.getItem("context");
//     if (context) {
//       setMessage(JSON.parse(context))
//     }
//   }, [])

//   useEffect(()=>{
//     localStorage.setItem("context",JSON.stringify(message));
//   },[message])

//   return (
//     <AppContext.Provider value={{ message, setMessage }}>
//       {props.children}
//     </AppContext.Provider>
//   )
// }
export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00a8ec",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#080606",
        contrastText: "#ffffff",
      },
      error: {
        main: "#ff3d60",
      },
      success: {
        main: "#1cbb8c",
        contrastText: "#ffffff",
      },
    },
    typography: {
      "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
    }
  });
  return <ThemeProvider theme={theme}>
    <style jsx global>{`
    html,body {
      font-family: ${roboto.style.fontFamily};
      font-size:14px
    }
  `}</style>
    <ToastContainer />
    <AppContexts>
      <Component {...pageProps} />
    </AppContexts>

  </ThemeProvider>
}
