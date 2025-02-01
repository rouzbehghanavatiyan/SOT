import React, { useState } from 'react'
import asyncWrapper from '../../common/AsyncWrapper';
import { addLike } from '../../services/dotNet';
const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
const userIdFromSStorage = sessionStorage.getItem("userId");

const StepTwo = () => {
    const [allDableWatch, setAllDableWatch] = useState([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [closingComments, setClosingComments] = useState(false);

    const handleLiked = asyncWrapper(async (movieId: number) => {
        console.log(movieId);
        const postData = {
            userId: userIdFromSStorage,
            movieId: movieId,
        };
        const res = await addLike(postData);
        console.log(res);
        setLikedVideos(newLikedVideos);
    });

    const handleShowCMT = () => {
        if (showComments) {
            setClosingComments(true);

            setTimeout(() => {
                setShowComments(false);
                setClosingComments(false);
            }, 300);
        } else {
            setShowComments(true);
        }
    };

    const handleAttachmentList = asyncWrapper(async () => {
        const res = await attachmentList();
        const { data, status } = res?.data;
        if (status === 0) {
            setAllDableWatch(data);
        }
    });

    useEffect(() => {
        handleAttachmentList();
    }, []);

    const handleRatio = (id: any) => {
        console.log(id);
        if (!isFullscreen) {
            const elem: any = document.getElementById(`video-${id}`); // استفاده از unique ID
            if (elem) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            }
            setIsFullscreen(true);
        } else {
            document.exitFullscreen(); // برای خروج از حالت Fullscreen
            setIsFullscreen(false);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        beforeChange: function (currentSlide: any, nextSlide: any) {
            console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function (currentSlide: any) {
            console.log("after change", currentSlide);
        },
    };

    const getVideosForDisplay = (allDableWatch: any) => {
        const videoGroups = allDableWatch
            .filter((item: any) => item.parentId === null)
            .map((parentItem: any) => {
                const childItem = allDableWatch.find(
                    (child: any) => child.parentId === parentItem.inviteId
                );

                return {
                    parent: parentItem,
                    child: childItem ? childItem : null,
                };
            })
            .filter((group: any) => group.child !== null);
        return videoGroups;
    };

    const videoGroups = getVideosForDisplay(allDableWatch);

    return (
        <div>StepTwo</div>
    )
}

export default StepTwo