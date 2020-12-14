var defaultScaleValue = 0.100;
var defaultRotaionValue = 0;

var previousRotationValue = defaultRotaionValue;
var previousScaleValue = defaultScaleValue;

previousScaleValue2d = 1;

var oneFingerGestureAllowed = false;

AR.context.on2FingerGestureStarted = function () {
    oneFingerGestureAllowed = false;
};


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
            "e639b0d3e41972100e879618c13be722",
            "rk-F4ECFFw",
            "5fb6061995d79d506359920f", {
            onInitialized: World.showInfoBar,
            onError: World.onError
        }
        );

        World.tracker = new AR.ImageTracker(this.cloudRecognitionService, {
            onError: World.onError
        });

    },
    switchCam: function switchCamFn() {
        if (AR.hardware.camera.position === AR.CONST.CAMERA_POSITION.FRONT) {
            AR.hardware.camera.position = AR.CONST.CAMERA_POSITION.BACK
        } else {
            AR.hardware.camera.position = AR.CONST.CAMERA_POSITION.FRONT
        }
    },
    updateFlashlight: function updateFlashlightFn(flashEnabled) {
        /* Get current checkbox status. */
        AR.hardware.camera.flashlight = flashEnabled;
    },
    updateRangeValues: function updateRangeValuesFn(currentValue) {
        AR.hardware.camera.zoom = parseFloat(currentValue);
    },
    onRecognition: function onRecognitionFn(recognized, response) {

        if (recognized) {

            alert(JSON.stringify(response));
            const { type, filename, filePath } = response.metadata;
            document.getElementById("loadingMessage").style.display = "block";
            if (type === '3d') {

                if (World.sirenSound !== undefined) {
                    World.sirenSound.stop();
                    World.sirenSound.destroy();
                }

                if (World.arContent !== undefined) {
                    World.arContent.destroy();
                }

                World.arContent = new AR.Model(`assets/ArContent/Ar3Dmodels/${filename}`, {
                    onLoaded: World.loader,
                    onError: World.onError,
                    translate: {
                        x: 0.0,
                        y: 0.0,
                        z: 0.0
                    },
                    scale: {
                        x: defaultScaleValue,
                        y: defaultScaleValue,
                        z: defaultScaleValue
                    },
                    rotate: {
                        z: defaultRotaionValue
                    },
                    onDragBegan: function ( /*x, y*/) {
                        oneFingerGestureAllowed = true;

                        return true;
                    },
                    onDragChanged: function (x, y, intersectionX, intersectionY) {
                        if (oneFingerGestureAllowed) {
                            this.translate = {
                                x: intersectionX,
                                y: intersectionY
                            };
                        }

                        return true;
                    },
                    onDragEnded: function ( /*x, y*/) {
                        return true;
                    },
                    onRotationBegan: function ( /*angleInDegrees*/) {
                        return true;
                    },
                    onRotationChanged: function (angleInDegrees) {
                        this.rotate.z = previousRotationValue - angleInDegrees;
                        this.rotate.x = previousRotationValue - angleInDegrees;
                        this.rotate.y = previousRotationValue - angleInDegrees

                        return true;
                    },
                    onRotationEnded: function ( /*angleInDegrees*/) {
                        previousRotationValue = this.rotate.z;

                        return true;
                    },
                    onScaleBegan: function ( /*scale*/) {
                        return true;
                    },
                    onScaleChanged: function (scale) {
                        var scaleValue = previousScaleValue * scale;
                        this.scale = {
                            x: scaleValue,
                            y: scaleValue
                        };

                        return true;
                    },
                    onScaleEnded: function ( /*scale*/) {
                        previousScaleValue = this.scale.x;

                        return true;
                    },
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

            else if (type === 'image') {

                if (World.sirenSound !== undefined) {
                    World.sirenSound.stop();
                    World.sirenSound.destroy();
                }

                World.bannerImg = new AR.ImageResource(`assets/ArContent/ArImage/${filename}`, {
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
                    onDragBegan: function ( /*x, y*/) {
                        oneFingerGestureAllowed = true;

                        return true;
                    },
                    onDragChanged: function (x, y, intersectionX, intersectionY) {
                        if (oneFingerGestureAllowed) {
                            this.translate = {
                                x: intersectionX,
                                y: intersectionY
                            };
                        }

                        return true;
                    },
                    onDragEnded: function ( /*x, y*/) {
                        return true;
                    },
                    onRotationBegan: function ( /*angleInDegrees*/) {
                        return true;
                    },
                    onRotationChanged: function (angleInDegrees) {
                        this.rotate.z = previousRotationValue + angleInDegrees;
                        return true;
                    },
                    onRotationEnded: function ( /*angleInDegrees*/) {
                        previousRotationValue = this.rotate.z;

                        return true;
                    },
                    onScaleBegan: function ( /*scale*/) {
                        return true;
                    },
                    onScaleChanged: function (scale) {
                        var scaleValue = previousScaleValue2d * scale;
                        this.scale = {
                            x: scaleValue,
                            y: scaleValue
                        };

                        return true;
                    },
                    onScaleEnded: function ( /*scale*/) {
                        previousScaleValue2d = this.scale.x;

                        return true;
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
            else if (type === 'video') {

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

                World.arContent = new AR.VideoDrawable(`assets/ArContent/ArVideos/${filename}`, 0.50, {
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

            else if (type === "audio") {


                if (World.arContent !== undefined) {
                    World.arContent.destroy();
                }

                if (World.sirenSound !== undefined) {
                    World.sirenSound.stop();
                    World.sirenSound.destroy();
                }


                World.sirenSound = new AR.Sound(`assets/ArContent/ArAudio/${filename}`, {
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
                            },
                            onDragBegan: function ( /*x, y*/) {
                                oneFingerGestureAllowed = true;

                                return true;
                            },
                            onDragChanged: function (x, y, intersectionX, intersectionY) {
                                if (oneFingerGestureAllowed) {
                                    this.translate = {
                                        x: intersectionX,
                                        y: intersectionY
                                    };
                                }

                                return true;
                            },
                            onDragEnded: function ( /*x, y*/) {
                                return true;
                            },
                            onRotationBegan: function ( /*angleInDegrees*/) {
                                return true;
                            },
                            onRotationChanged: function (angleInDegrees) {
                                this.rotate.z = previousRotationValue + angleInDegrees;
                                return true;
                            },
                            onRotationEnded: function ( /*angleInDegrees*/) {
                                previousRotationValue = this.rotate.z;

                                return true;
                            },
                            onScaleBegan: function ( /*scale*/) {
                                return true;
                            },
                            onScaleChanged: function (scale) {
                                var scaleValue = previousScaleValue2d * scale;
                                this.scale = {
                                    x: scaleValue,
                                    y: scaleValue
                                };

                                return true;
                            },
                            onScaleEnded: function ( /*scale*/) {
                                previousScaleValue2d = this.scale.x;

                                return true;
                            },
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
        this.resetOverlayvalues();
    },

    resetOverlayvalues: function () {
        previousRotationValue = defaultRotaionValue;
        previousScaleValue = defaultScaleValue;
        previousScaleValue2d = 1;
        oneFingerGestureAllowed = false;
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