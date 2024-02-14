//import defaultImage from "../../assets/1699712564Centaur2.svg"
import { useRef, useState } from "react";
import "./imageGenerator.css"
const ImageGenerator = () => {

  const [imageG, setImageG] = useState("/")
  const defaultImage = null
  let inputRef = useRef(null)

  const [loading, setLoading] = useState(false)

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0
    }
    setLoading(true)
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer key",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512"
        })
      }
    )

    let data = await response.json();
    let data_array = data.data

    setImageG(data_array[0].url)
    setLoading(false)
  }

  return (
    <div className="ai-image-generator">
      <div className="header">Ai image <span>generator</span></div>
      <div className="img-loading">
        <div className="img"><img src={imageG === "/" ? defaultImage : imageG} alt="" /></div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}>
            <div className={loading ? "loading-text" : "display-none"}>
              Loading...
            </div>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className="search-input" placeholder="Describe what you want" />
        <div className="generate-btn" onClick={() => imageGenerator()}>Generate</div>
      </div>
    </div>
  )
}


export default ImageGenerator;
