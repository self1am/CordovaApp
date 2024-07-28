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
                this.#addTouchListeners();
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
        window.addEventListener('deviceorientation', (event) => {
            // Assuming landscape mode with default forward direction
            const tiltLR = event.beta * Math.PI / 180; // left-right tilt in degrees

            // Threshold values for detecting movement
            const tiltThreshold = 15;

            this.left = tiltLR < -tiltThreshold;
            this.right = tiltLR > tiltThreshold;
        });
    }

    #addTouchListeners() {
        document.addEventListener('touchstart', (event) => {
            // Get the touch position relative to the screen width
            const touchX = event.touches[0].clientX;
            const screenWidth = window.innerWidth;

            if (touchX > screenWidth / 2) {
                this.forward = true;
            } else {
                this.reverse = true;
            }
        });

        document.addEventListener('touchend', (event) => {
            // Reset forward and reverse when touch ends
            this.forward = false;
            this.reverse = false;
        });
    }
}
