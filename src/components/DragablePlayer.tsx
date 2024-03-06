import React, { useEffect, useState } from "react"
import { animated, useSpring } from "react-spring"
import { useDrag } from "@use-gesture/react"
import { FaPlay, FaPlayCircle, FaPause, FaPauseCircle, FaAngleDown, FaShareAlt } from "react-icons/fa";
import { FaRepeat, FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHeartEmpty, IoMdHeart  } from "react-icons/io";

const windowHeight = window.innerHeight *5/6;

const DragablePlayer = ({ playing } : { playing: boolean }) => {
  const [ {y, opacity } , api ] = useSpring(() => ({ y: 0, opacity: 1 }));
  const [ {y2, opacity2 } , api2 ] = useSpring(() => ({ y2: windowHeight, opacity2: 0 }));
  const [open, setOpen] = useState(false);

const bind = useDrag(({ down, movement: [_, my] }) => {
    if (open) {
        return;
    }
    if (my > 0) {
        return;
    }
    let dy = -my;
    if (!down) {
        if (dy > 150) {
            setOpen(true);
            api.start({ y: 0, opacity: 0, immediate: false });
            api2.start({ y2: 16, opacity2: 1, immediate: false });
        } else {
            api.start({ y: 0, opacity: 1, immediate: false });
            api2.start({ y2: windowHeight, opacity2: 0, immediate: false });
        }
        return;
    }

    if (dy <= 150) {
        let factor = dy / 150;
        api.start({ y: my, opacity: 1 - factor, immediate: true });
        api2.start({ y2: windowHeight - dy, opacity2: factor, immediate: true });
    } else {
        api.start({ y: my, opacity: 0, immediate: true });
        api2.start({ y2: windowHeight - dy, opacity2: 1, immediate: true });
    }
}, { axis: "y" });

const bind2 = useDrag(({ down, movement: [_, my] }) => {
    if (!open) {
        return;
    }
    if (my < 15) {
        return;
    }
    let dy = my;

    if (!down) {
        if (dy > 75) {
            setOpen(false);
            api.start({ y: 0, immediate: false });
            api.start({ opacity: 1, immediate: true });
            api2.start({ y2: windowHeight, immediate: false });
            api2.start({ opacity2: 0, immediate: true });
        } else {
            api.start({ y: dy - windowHeight, opacity: 0, immediate: false });
            api.start({ opacity: 0, immediate: true });
            api2.start({ y2: 16, immediate: false });
            api2.start({ opacity2: 1, immediate: true });
        }
        return;
    }

    if (windowHeight-dy <= 150) {
        let factor = (windowHeight-dy) / 150;
        api.start({ y: dy - windowHeight, opacity: 1-factor, immediate: true });
        api2.start({ y2: dy, opacity2: factor, immediate: true });
    } else {
        api.start({ y: dy - windowHeight, opacity: 0, immediate: true });
        api2.start({ y2: dy, opacity2: 1, immediate: true });
    }
}, { axis: "y" });
  
useEffect(() => {
    let target = document.getElementById("song-title");
    if(target == null){
        return;
    }
    // fix weird rendering bug on mobile with trunacate
    target.style.display = "none";
    target.style.display = "flex";
}, [])
return (
    <>
    <animated.div id={"test"} style={{ y, opacity }} className="md:hidden absolute bottom-2 h-1/8 w-full z-20 select-none touch-none" {...bind()}>
            <div className="relative flex flex-row items-center justify-between bg-gray-700 h-full mx-2 rounded-t-lg">
                    <div className="min-w-0 flex flex-row h-full p-2 pb-3">
                            <img draggable="false" alt="VibeVault" className="rounded-md aspect-square h-full" src="https://i.scdn.co/image/ab67616d00001e0222463d6939fec9e17b2a6235"></img>
                            <div className="flex flex-col ml-2 justify-evenly overflow-x-hidden touch-none select-none">
                                    <p id="song-title" className="text-xs truncate font-medium">Song Title that is to long</p>
                                    <p className="text-xs">Artist</p>
                            </div>
                    </div>

                    <div className="flex justify-self-end p-2 m-2">
                            {playing ? <FaPause className="active:scale-[.95] text-2xl" /> : <FaPlay className="active:scale-[.95] text-2xl"/> }
                    </div>
                    <input min={0} max={1000} step={1} type="range" className="absolute bottom-0 w-full bg-blue-600 h-1 rounded-full dark:bg-blue-500" />
            </div>
    </animated.div>
    <animated.div style={{ y: y2, opacity: opacity2, zIndex: open? 30: 10 }} className="md:hidden absolute bottom-4 h-full overflow-y-hidden w-full select-none" >
            <div className="relative flex flex-col items-center justify-between from-gray-800 to-gray-400 bg-gradient-to-t h-full rounded-t-lg">
                    <div {...bind2()} className="w-full flex flex-row justify-between touch-none">
                            <div className="p-4 pt-8" onClick={(e) => {
                                    e.stopPropagation();
                                    setOpen(false);
                                    api.start({ y: 0, immediate: true });
                                    api.start({ opacity: 1, immediate: true });
                                    api2.start({ from:{y2:15, opacity2: 1}, to: {y2: windowHeight, opacity2: 0}, immediate: false, config: {duration: 200, easing: t => t*t}});
                            }}>
                                <FaAngleDown className="text-4xl" />
                            </div>
                            <div className="pt-8 touch-none select-none">
                                <h1 className="text-sm text-gray-400 font-medium">Playing now</h1>
                                <h1 className="text-base font-medium">Song Title</h1>
                            </div>
                            <div className="p-4 pt-8">
                                <BsThreeDotsVertical className="text-4xl touch-none active:scale-[.95]" />
                            </div>
                    </div>
                    <img draggable={false} src="https://i.scdn.co/image/ab67616d00001e0222463d6939fec9e17b2a6235" style={{ maxWidth:"90%", maxHeight: "50%", height: "auto", minWidth: "50%" }} className="aspect-square" />
                    <div className="flex h-1/4 mb-4 w-7/8 flex-col flex justify-between">
                            <div className="flex flex-row justify-between">
                                    <div className="flex flex-col justify-evenly overflow-x-hidden select-none">
                                            <p className="text-sm truncate font-medium">Song Title that is rrrr</p>
                                            <p className="text-xs">Artist</p>
                                    </div>
                                    <div className="flex flex-row justify-evenly items-center">
                                            <IoMdHeartEmpty className="text-3xl active:scale-[.95]" />
                                            <IoMdHeart className="text-3xl active:scale-[.95]" />
                                    </div>
                            </div>
                            <div>
                                    <input min={0} max={1000} step={1} type="range" className="bottom-0 w-full bg-blue-600 dark:bg-blue-500" />
                                    <div className="flex flex-row justify-between">
                                            <p className="text-sm truncate font-medium">1:32</p>
                                            <p className="text-sm truncate font-medium">3:45</p>
                                    </div>
                            </div>
                            <div className="flex flex-row justify-between">
                                    <FaShareAlt className="text-4xl w-1/5 active:scale-[.95]" />
                                    <FaBackwardStep className="text-4xl w-1/5 active:scale-[.95]" />
                                    {playing ? <FaPauseCircle className="text-4xl w-1/5 active:scale-[.95]" /> : <FaPlayCircle className="text-4xl w-1/5 active:scale-[.95]" />}
                                    <FaForwardStep className="text-4xl w-1/5 active:scale-[.95]" />
                                    <FaRepeat className="text-4xl w-1/5 active:scale-[.95]" />
                            </div>
                            <div>

                            </div>
                    </div>
            </div>
    </animated.div>
    </>
)
}

export default DragablePlayer