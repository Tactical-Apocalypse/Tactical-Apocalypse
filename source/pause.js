class PauseMenu {
    constructor (onComplete) {
        this.onComplete = onComplete;
    }

    createMenu () {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'pauseMenu');
        this.element.innerHtml = {
            <h2>Pause Menu<h2>
        }        
    }

    resume () {

    }

    init (container) {
        this.createElement();
        this.keyboardMenu = new keyboardMenu({
            //
        });
        this.keyboardMenu.init(this.element);
        this.keyboardMenu.setOptions([]);
        container.appendChild(this.element);
        this.esc = 
    }
}