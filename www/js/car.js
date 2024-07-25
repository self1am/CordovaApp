class Controls {
    constructor(type) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch (type) {
            case "KEYS":
                if (window.DeviceOrientationEvent) {
                    window.addEventListener("deviceorientation", this.#handleOrientation.bind(this), true);
                } else {
                    this.#addKeyboardListeners();
                }
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
        }
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
        }
    }

    #handleOrientation(event) {
        const { beta, gamma } = event;

        // Forward/Reverse control
        if (beta > 10) {
            this.forward = true;
            this.reverse = false;
        } else if (beta < -10) {
            this.forward = false;
            this.reverse = true;
        } else {
            this.forward = false;
            this.reverse = false;
        }

        // Left/Right control
        if (gamma > 10) {
            this.right = true;
            this.left = false;
        } else if (gamma < -10) {
            this.right = false;
            this.left = true;
        } else {
            this.right = false;
            this.left = false;
        }
    }
}
