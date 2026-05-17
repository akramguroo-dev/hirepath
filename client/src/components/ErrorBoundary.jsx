import React,{Component} from "react";
import { motion } from "framer-motion";
class ErrorBoundary extends Component {
    constructor(props){
    super(props);
    this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error){
        return {hasError:true, error};
    }
    componentDidCatch(error,errorInfo){
        console.error("ErrorBoundary caught an error:",error,errorInfo);
    }
    handleGoHome = ()=>{
        this.setState({hasError:false,error:null});
        window.location.href = "/";
    };
    render(){
        if(this.state.hasError){
            return(
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
                    <motion.div
                    initial={{opacity:0,y:10}}
                    animate={{opacity:1,y:0}}
                    transition={{duration:0.4}}
                    className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-lg p-8 text-center"
                    >
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                        ⚠️
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>

                        <p className="text-gray-600 mb-6 text-sm">
                        {this.state.error?.message || "An unexpected rendering error occurred inside this page."}
                        </p>

                        <button onClick={this.handleGoHome}
                        className="px-6 py-2.5 bg-[#008BDC] text-white font-bold rounded shadow-md hover:bg-[#0076ba] transition w-full"
                        >
                        Go Home
                        </button>
                    </motion.div>
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;