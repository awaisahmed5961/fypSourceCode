// var World = {
//     loaded: false,
//     tracker: null,
//     type: 'video',
//     cloudRecognitionService: null,

//     init: function initFn() {
//         this.createTracker();

//     },


//     // Initating cloud recog connection
//     createTracker: function createTrackerFn() {
//         this.cloudRecognitionService = new AR.CloudRecognitionService(
//             "5da7f1ee89f87ef5f8701ef04f0c76f0",
//             "Hyk0nNDYP",
//             "5fa9bcdecfa0c01c44f3410a", {
//             onInitialized: World.trackerLoaded,
//             onError: World.onError
//         }
//         );

//         World.tracker = new AR.ImageTracker(this.cloudRecognitionService, {
//             onError: World.onError
//         });

//     },

//     startContinuousRecognition: function startContinuousRecognitionFn(interval) {

//         this.cloudRecognitionService.startContinuousRecognition(
//             interval, this.onInterruption, this.onRecognition, this.onRecognitionError);

//     },

//     onRecognition: function onRecognitionFn(recognized, response) {

//         if (recognized) {
//             document.getElementById("loadingMessage").style.display = "block";

//             World.type = 'video';

//             if (World.type === '3d') {
//                 if (World.sirenSound !== undefined) {
//                     World.sirenSound.stop();
//                     World.sirenSound.destroy();
//                 }

//                 if (World.arContent !== undefined) {
//                     World.arContent.destroy();
//                 }

//                 World.arContent = new AR.Model("assets/car.wt3", {
//                     onLoaded: World.loader,
//                     onError: World.onError,
//                     scale: {
//                         x: 0.100,
//                         y: 0.100,
//                         z: 0.100
//                     },
//                     translate: {
//                         x: 0.0,
//                         y: 0.0,
//                         z: 0.0
//                     },
//                     rotate: {
//                         z: -25
//                     }
//                 });

//                 if (World.renderAugmentation !== undefined) {
//                     World.renderAugmentation.destroy();
//                 }

//                 World.renderAugmentation = new AR.ImageTrackable(World.tracker, response.targetInfo.name, {
//                     drawables: {
//                         cam: [World.arContent]
//                     },
//                     onError: World.onError
//                 });
//             }

//             else if (World.type === 'image') {

//                 World.bannerImg = new AR.ImageResource("assets/banner.jpg", {
//                     onLoaded: World.loader,
//                     onError: World.onError
//                 });

//                 if (World.arContent !== undefined) {
//                     World.arContent.destroy();
//                 }

//                 World.arContent = new AR.ImageDrawable(World.bannerImg, 0.27, {
//                     translate: {
//                         x: 0.0,
//                         y: 0.0
//                     },
//                     zOrder: 1
//                 });

//                 if (World.renderAugmentation !== undefined) {
//                     World.renderAugmentation.destroy();
//                 }


//                 World.renderAugmentation = new AR.ImageTrackable(World.tracker, response.targetInfo.name, {
//                     drawables: {
//                         cam: [World.arContent]
//                     },
//                     onError: World.onError
//                 });

//             }
//             else if (World.type === 'video') {
//                 /* Create play button which is used for starting the video. */
//                 World.playButtonImg = new AR.ImageResource("assets/playButton.png", {
//                     onError: World.onError
//                 });
//                 World.playButton = new AR.ImageDrawable(World.playButtonImg, 0.3, {
//                     enabled: false,
//                     clicked: false,
//                     zOrder: 2,
//                     onClick: function playButtonClicked() {
//                         World.playButton.enabled = false;
//                         World.arContent.resume();
//                         World.arContent.playing = true;
//                         World.playButton.clicked = true;
//                     },
//                     translate: {
//                         x: 0.0,
//                         y: 0.0
//                     }
//                 });


//                 if (World.arContent !== undefined) {
//                     World.arContent.destroy();
//                 }

//                 World.arContent = new AR.VideoDrawable(`assets/ArContent/ArVideos/${response.metadata.filename}`, 0.50, {
//                     translate: {
//                         x: World.playButton.translate.x,
//                         y: World.playButton.translate.y
//                     },
//                     zOrder: 1,
//                     onLoaded: function videoLoaded() {
//                         World.loader();
//                         World.playButton.enabled = true;
//                     },
//                     onPlaybackStarted: function videoPlaying() {
//                         World.playButton.enabled = false;
//                         World.arContent.enabled = true;
//                     },
//                     onFinishedPlaying: function videoFinished() {
//                         World.playButton.enabled = true;
//                         World.arContent.playing = false;
//                         World.arContent.enabled = false;
//                     },
//                     onClick: function videoClicked() {
//                         if (World.playButton.clicked) {
//                             World.playButton.clicked = false;
//                         } else if (World.arContent.playing) {
//                             World.arContent.pause();
//                             World.arContent.playing = false;
//                             World.playButton.enabled = true;
//                         }
//                     },
//                     onError: World.onError
//                 });


//                 if (World.renderAugmentation !== undefined) {
//                     World.renderAugmentation.destroy();
//                 }

//                 World.renderAugmentation = new AR.ImageTrackable(World.tracker, response.targetInfo.name, {
//                     drawables: {
//                         cam: [World.arContent, World.playButton]
//                     },

//                     onImageRecognized: function onImageRecognizedFn() {
//                         if (World.arContent.playing) {
//                             World.arContent.resume();
//                         }
//                     },
//                     onImageLost: function onImageLostFn() {
//                         if (World.arContent.playing) {
//                             World.arContent.pause();
//                         }
//                     },
//                     onError: World.onError
//                 });
//             }

//             else if (World.type === "audio") {

//                 if (World.arContent !== undefined) {
//                     World.arContent.destroy();
//                 }

//                 if (World.sirenSound !== undefined) {
//                     World.sirenSound.stop();
//                     World.sirenSound.destroy();
//                 }


//                 World.sirenSound = new AR.Sound("assets/rt.mp3", {
//                     onError: World.onError,
//                     onFinishedPlaying: function onFinishedPlayingFn() {
//                         World.playButton.playing = false;
//                     },
//                     onLoaded: function onLoadedFn() {
//                         World.playButtonImg = new AR.ImageResource("assets/audioplay.png", {
//                             onError: World.onError
//                         });


//                         World.arContent = new AR.ImageDrawable(World.playButtonImg, 0.3, {
//                             playing: false,
//                             zOrder: 2,
//                             onClick: function playButtonClicked() {
//                                 if (!World.arContent.playing) {
//                                     World.sirenSound.play();
//                                     World.arContent.playing = true;
//                                 }
//                                 else {
//                                     World.sirenSound.stop();
//                                     World.arContent.playing = false;
//                                 }
//                             },
//                             translate: {
//                                 x: 0.0,
//                                 y: 0.0
//                             }
//                         });

//                         if (World.renderAugmentation !== undefined) {
//                             World.renderAugmentation.destroy();
//                         }
//                         World.loader();

//                         World.renderAugmentation = new AR.ImageTrackable(World.tracker, response.targetInfo.name, {
//                             drawables: {
//                                 cam: [World.arContent]
//                             },
//                             onImageLost: function onImageLostFn() {
//                                 if (World.arContent.playing) {
//                                     World.sirenSound.stop();
//                                 }
//                             },
//                             onError: World.onError,
//                         });
//                     }
//                 });
//                 World.sirenSound.load();
//             }
//         }
//     },

//     onRecognitionError: function onRecognitionErrorFn(errorCode, errorMessage) {
//         alert("error code: " + errorCode + " error message: " + JSON.stringify(errorMessage));
//     },


//     onInterruption: function onInterruptionFn(suggestedInterval) {
//         World.cloudRecognitionService.stopContinuousRecognition();
//         World.startContinuousRecognition(suggestedInterval);
//     },

//     trackerLoaded: function trackerLoadedFn() {
//         World.startContinuousRecognition(750);
//         World.showInfoBar();
//     },

//     onError: function onErrorFn(error) {
//         alert(error);
//     },

//     hideInfoBar: function hideInfoBarFn() {
//         document.getElementById("infoBox").style.display = "none";
//     },

//     showInfoBar: function worldLoadedFn() {
//         document.getElementById("infoBox").style.display = "table";
//         document.getElementById("loadingMessage").style.display = "none";
//     },
//     loader: function stoploader() {
//         document.getElementById("loadingMessage").style.display = "none";
//     },
// };

// World.init();


var World = {
    loaded: false,
    tracker: null,
    type: 'video',
    cloudRecognitionService: null,

    init: function initFn() {
        this.createTracker();

    },


    // Initating cloud recog connection
    createTracker: function createTrackerFn() {
        this.cloudRecognitionService = new AR.CloudRecognitionService(
            // "b277eeadc6183ab57a83b07682b3ceba",
            // "B1QL5CTCZ",
            // "54e4b9fe6134bb74351b2aa3", {
            "5da7f1ee89f87ef5f8701ef04f0c76f0",
            "Hyk0nNDYP",
            "5fa9bcdecfa0c01c44f3410a", {
            onInitialized: World.showInfoBar,
            onError: World.onError
        }
        );

        World.tracker = new AR.ImageTracker(this.cloudRecognitionService, {
            onError: World.onError
        });

    },

    onRecognition: function onRecognitionFn(recognized, response) {

        if (recognized) {

            alert(response)
            document.getElementById("loadingMessage").style.display = "block";
            if (response.type === '3d') {

                if (World.sirenSound !== undefined) {
                    World.sirenSound.stop();
                    World.sirenSound.destroy();
                }

                if (World.arContent !== undefined) {
                    World.arContent.destroy();
                }

                World.arContent = new AR.Model(`assets/ArContent/Ar3Dmodels/${response.filename}`, {
                    onLoaded: World.loader,
                    onError: World.onError,
                    scale: {
                        x: 0.100,
                        y: 0.100,
                        z: 0.100
                    },
                    translate: {
                        x: 0.0,
                        y: 0.0,
                        z: 0.0
                    },
                    rotate: {
                        z: -25
                    }
                });

                if (World.renderAugmentation !== undefined) {
                    World.renderAugmentation.destroy();
                }

                World.renderAugmentation = new AR.ImageTrackable(World.tracker, response.targetInfo.name, {
                    drawables: {
                        cam: [World.arContent]
                    },
                    onError: World.onError
                });
            }

            else if (response.type === 'image') {

                if (World.sirenSound !== undefined) {
                    World.sirenSound.stop();
                    World.sirenSound.destroy();
                }

                World.bannerImg = new AR.ImageResource(`assets/ArContent/ArImage/${response.filename}`, {
                    onLoaded: World.loader,
                    onError: World.onError
                });

                if (World.arContent !== undefined) {
                    World.arContent.destroy();
                }

                World.arContent = new AR.ImageDrawable(World.bannerImg, 0.27, {
                    translate: {
                        x: 0.0,
                        y: 0.0
                    },
                    zOrder: 1
                });

                if (World.renderAugmentation !== undefined) {
                    World.renderAugmentation.destroy();
                }


                World.renderAugmentation = new AR.ImageTrackable(World.tracker, response.targetInfo.name, {
                    drawables: {
                        cam: [World.arContent]
                    },
                    onError: World.onError
                });

            }
            else if (response.type === 'video') {

                if (World.sirenSound !== undefined) {
                    World.sirenSound.stop();
                    World.sirenSound.destroy();
                }

                /* Create play button which is used for starting the video. */
                World.playButtonImg = new AR.ImageResource("assets/playButton.png", {
                    onError: World.onError
                });
                World.playButton = new AR.ImageDrawable(World.playButtonImg, 0.3, {
                    enabled: false,
                    clicked: false,
                    zOrder: 2,
                    onClick: function playButtonClicked() {
                        World.playButton.enabled = false;
                        World.arContent.resume();
                        World.arContent.playing = true;
                        World.playButton.clicked = true;
                    },
                    translate: {
                        x: 0.0,
                        y: 0.0
                    }
                });


                if (World.arContent !== undefined) {
                    World.arContent.destroy();
                }

                World.arContent = new AR.VideoDrawable(`assets/ArContent/ArVideos/${response.filename}`, 0.50, {
                    translate: {
                        x: World.playButton.translate.x,
                        y: World.playButton.translate.y
                    },
                    zOrder: 1,
                    onLoaded: function videoLoaded() {
                        World.loader();
                        World.playButton.enabled = true;
                    },
                    onPlaybackStarted: function videoPlaying() {
                        World.playButton.enabled = false;
                        World.arContent.enabled = true;
                    },
                    onFinishedPlaying: function videoFinished() {
                        World.playButton.enabled = true;
                        World.arContent.playing = false;
                        World.arContent.enabled = false;
                    },
                    onClick: function videoClicked() {
                        if (World.playButton.clicked) {
                            World.playButton.clicked = false;
                        } else if (World.arContent.playing) {
                            World.arContent.pause();
                            World.arContent.playing = false;
                            World.playButton.enabled = true;
                        }
                    },
                    onError: World.onError
                });


                if (World.renderAugmentation !== undefined) {
                    World.renderAugmentation.destroy();
                }

                World.renderAugmentation = new AR.ImageTrackable(World.tracker, response.targetInfo.name, {
                    drawables: {
                        cam: [World.arContent, World.playButton]
                    },

                    onImageRecognized: function onImageRecognizedFn() {
                        if (World.arContent.playing) {
                            World.arContent.resume();
                        }
                    },
                    onImageLost: function onImageLostFn() {
                        if (World.arContent.playing) {
                            World.arContent.pause();
                        }
                    },
                    onError: World.onError
                });
            }

            else if (response.type === "audio") {


                if (World.arContent !== undefined) {
                    World.arContent.destroy();
                }

                if (World.sirenSound !== undefined) {
                    World.sirenSound.stop();
                    World.sirenSound.destroy();
                }


                World.sirenSound = new AR.Sound(`assets/ArContent/ArAudio/${response.filename}`, {
                    onError: World.onError,
                    onFinishedPlaying: function onFinishedPlayingFn() {
                        World.playButton.playing = false;
                    },
                    onLoaded: function onLoadedFn() {
                        World.playButtonImg = new AR.ImageResource("assets/audioplay.png", {
                            onError: World.onError
                        });


                        World.arContent = new AR.ImageDrawable(World.playButtonImg, 0.3, {
                            playing: false,
                            zOrder: 2,
                            onClick: function playButtonClicked() {
                                if (!World.arContent.playing) {
                                    World.sirenSound.play();
                                    World.arContent.playing = true;
                                }
                                else {
                                    World.sirenSound.stop();
                                    World.arContent.playing = false;
                                }
                            },
                            translate: {
                                x: 0.0,
                                y: 0.0
                            }
                        });

                        if (World.renderAugmentation !== undefined) {
                            World.renderAugmentation.destroy();
                        }
                        World.loader();

                        World.renderAugmentation = new AR.ImageTrackable(World.tracker, response.targetInfo.name, {
                            drawables: {
                                cam: [World.arContent]
                            },
                            onImageLost: function onImageLostFn() {
                                if (World.arContent.playing) {
                                    World.sirenSound.stop();
                                }
                            },
                            onError: World.onError,
                        });
                    }
                });
                World.sirenSound.load();
            }
        }
    },

    onRecognitionError: function onRecognitionErrorFn(errorCode, errorMessage) {
        alert("error code: " + errorCode + " error message: " + JSON.stringify(errorMessage));
    },

    scan: function scanFn() {
        /*
            The tracker recognize function is passed two callback functions. The first callback function will be
            called by the server after each recognition cycle. The second callback defines an on error callback
            function. It will be called if there is something wrong in your cloud archive.
        */
        this.cloudRecognitionService.recognize(this.onRecognition, this.onRecognitionError);
    },


    onError: function onErrorFn(error) {
        alert(error);
    },

    hideInfoBar: function hideInfoBarFn() {
        document.getElementById("infoBox").style.display = "none";
    },

    showInfoBar: function worldLoadedFn() {
        document.getElementById("infoBox").style.display = "table";
        document.getElementById("loadingMessage").style.display = "none";
    },
    loader: function stoploader() {
        document.getElementById("loadingMessage").style.display = "none";
    },
};

World.init();