import "./css/LineLoader.css"
import "./css/DefaultLoader.css"

export const LineLoader = () => <div className="line-loader"></div>

export const DefaultLoader = ({white}: {white: boolean}) => <div className={`default-loader ${white ? "white" : ""}`}></div>