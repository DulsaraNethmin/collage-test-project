import defaultImage from "../../assets/meme-templates/default-pic.jpg"
import Navbar from "../Navbar"
import React, { useState, useRef } from "react"
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa"
import { MdAddPhotoAlternate } from "react-icons/md"
import { MdArrowBackIos } from "react-icons/md"
import { Link } from "react-router-dom"

const Template1 = () => {
  const [selectedImage, setSelectedImage] = useState(defaultImage)
  const [text, setText] = useState("your text here")
  const [textColor, setTextColor] = useState("#000000") // Default text color set to black
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [tempText, setTempText] = useState(text)
  const [isBold, setIsBold] = useState(false) // State to track bold text
  const [isItalic, setIsItalic] = useState(false) // State to track italic text
  const [isUnderline, setIsUnderline] = useState(false) // State to track underline text
  const canvasRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTextClick = () => {
    setIsPopupOpen(true)
    setTempText(text)
  }

  const handleTextChange = (event) => {
    setTempText(event.target.value)
  }

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value) // Update the text color
  }

  const toggleBold = () => {
    setIsBold((prevBold) => !prevBold) // Toggle the bold state
  }

  const toggleItalic = () => {
    setIsItalic((prevItalic) => !prevItalic) // Toggle the italic state
  }

  const toggleUnderline = () => {
    setIsUnderline((prevUnderline) => !prevUnderline) // Toggle the underline state
  }

  const handleDoneClick = () => {
    setText(tempText)
    setIsPopupOpen(false)
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const image = new Image()
    image.src = selectedImage
    image.onload = () => {
      let width = image.width
      let height = image.height
      const maxWidth = 1920
      const maxHeight = 1080

      if (width > maxWidth || height > maxHeight) {
        const widthRatio = maxWidth / width
        const heightRatio = maxHeight / height
        const resizeRatio = Math.min(widthRatio, heightRatio)

        width = width * resizeRatio
        height = height * resizeRatio
      }

      canvas.width = width
      canvas.height = height + 120

      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, width, 120)

      ctx.fillStyle = textColor // Use the selected text color
      ctx.font = `${isBold ? "bold" : "normal"} ${isItalic ? "italic" : ""} 60px Arial` // Apply bold and italic based on state
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(text, width / 2, 60)

      // Draw underline if required
      if (isUnderline) {
        const textWidth = ctx.measureText(text).width
        ctx.beginPath()
        ctx.moveTo((width - textWidth) / 2, 90) // Adjust underline position
        ctx.lineTo((width + textWidth) / 2, 90)
        ctx.strokeStyle = textColor
        ctx.lineWidth = 2
        ctx.stroke()
      }

      ctx.drawImage(image, 0, 120, width, height)

      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "template1.png"
      link.click()
    }
  }

  return (
    <div className="flex min-h-full flex-col items-center bg-[#47464b]">
      <div className="flex w-full items-start justify-start">
        <Link to="/auth/main">
          <MdArrowBackIos className="ml-10 mt-3 text-[30px]" />
        </Link>
      </div>

      {selectedImage && (
        <div className="relative mt-4 rounded-md bg-[#16151a] px-[70px] py-[30px]">
          <div className="mb-6 flex items-center justify-between">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
              id="file-upload-template1"
              style={{ display: "none" }}
            />
            <label
              htmlFor="file-upload-template1"
              className="cursor-pointer rounded  text-[45px] text-white"
            >
              <div>
                <MdAddPhotoAlternate className="rounded-md border-2 border-solid border-white px-2 text-[60px]" />
              </div>
            </label>

            <div className="flex items-center justify-center gap-1 rounded-md bg-[#fff] p-4">
              <div>
                <input
                  type="color"
                  value={textColor}
                  onChange={handleTextColorChange}
                  className="h-[30px] w-[30px]"
                />
              </div>

              <button
                onClick={toggleBold}
                className={`rounded px-4 py-2  ${
                  isBold
                    ? ", bg-[#b0b0b0] text-black"
                    : ", bg-[#fff] text-[#343434]"
                } `}
              >
                <FaBold />
              </button>

              <button
                onClick={toggleItalic}
                className={`rounded px-4 py-2 ${
                  isItalic
                    ? "bg-[#b0b0b0] text-black"
                    : ", bg-[#fff] text-[#343434]"
                } `}
              >
                <FaItalic />
              </button>

              <button
                onClick={toggleUnderline}
                className={`rounded px-4 py-2 text-white ${
                  isUnderline
                    ? "bg-[#b0b0b0] text-black"
                    : ", bg-[#fff] text-[#343434]"
                } `}
              >
                <FaUnderline className="text-[#343434]" />
              </button>
            </div>
          </div>

          <div
            className="w-80 cursor-pointer bg-white p-4 text-center text-[35px]"
            onClick={handleTextClick}
            style={{
              color: textColor,
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
              textDecoration: isUnderline ? "underline" : "none",
            }} // Apply text styles
          >
            {text}
          </div>
          <img
            src={selectedImage}
            alt="Uploaded"
            className="h-auto w-80 rounded-b shadow-md"
          />

          <div className="flex items-center justify-end">
            <button
              onClick={downloadImage}
              className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Download
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white p-4 shadow-md">
            <h2 className="mb-2 text-xl text-black">Enter your text</h2>
            <input
              type="text"
              value={tempText}
              onChange={handleTextChange}
              className="mb-4 w-full border p-2"
            />

            <button
              onClick={handleDoneClick}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Template1
