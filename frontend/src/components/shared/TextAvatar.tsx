import React from 'react'
import cn from "classnames"

interface Props {
  fullname: string;
  size ?: "small" | "medium" | "large"
}

export const TextAvatar = ({fullname, size} : Props) => {

  if (!size) size = "medium"

  const colors = [cn("bg-red-400"), cn("bg-teal-400"), cn("bg-blue-400"), cn("bg-orange-400"), cn("bg-purple-400")];

  const styles = {
    small: cn("text-sm w-[30px] h-[30px]"),
    medium: cn("text-base w-[40px] h-[40px]"),
    large: cn("text-lg w-[60px] h-[60px]"),
  }

  return (
    <div className={
      cn("rounded-full bg-teal-400 flex justify-center items-center", 
      colors[Math.floor(Math.random() * colors.length)],
      styles[size]
    )}
    >
      <span className="text-white">
        {fullname[0].toUpperCase()}
      </span>
    </div>
  )
}
