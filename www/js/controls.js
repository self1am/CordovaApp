class Controls {
    constructor(type) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch (type) {
            case "KEYS":
                this.#addKeyboardListeners();
                this.#addDeviceOrientationListeners();
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }
    }

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        };

        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        };
    }

    #addDeviceOrientationListeners() {
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (event) => {
                // Assuming landscape mode with default forward direction
                const tiltLR = event.gamma; // left-right tilt in degrees
                const tiltFB = event.beta; // forward-backward tilt in degrees

                // Threshold values for detecting movement
                const tiltThreshold = 15;

                this.left = tiltLR < -tiltThreshold;
                this.right = tiltLR > tiltThreshold;
                this.forward = tiltFB < -tiltThreshold;
                this.reverse = tiltFB > tiltThreshold;
            });
        }
    }
}