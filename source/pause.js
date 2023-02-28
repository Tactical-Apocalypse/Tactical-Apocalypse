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
        this.PauseMenu = new PauseMenu({
            //
        });
        this.PauseMenu.init(this.element);
        this.PauseMenu.setOptions([]);
        container.appendChild(this.element);
    }
}