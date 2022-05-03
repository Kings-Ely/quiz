const password = prompt('Password');

async function main () {
    const QDIV = document.getElementById('q');
    const buzzer = new Audio('buzzer.mp3');
    buzzer.setAttribute('preload', 'auto');
    const ding = new Audio('ding.wav');
    buzzer.setAttribute('preload', 'auto');

    let Q = [];

    function draw () {
        QDIV.innerHTML = '';

        if (!Q.length) {
            QDIV.innerHTML = '<p style="font-size: xxx-large; text-align: center">...</p>';
            return;
        }
        let first = Q[0].time;

        let i = 0;
        for (let press of Q) {
            if (i >= 3) break;
            const {name, time} = press;
            const place = Q.indexOf(press);

            QDIV.innerHTML += `
                <p class="q-element">
                    ${place + 1}
                    <span style="padding-left: 5%">
                        ${name}
                    </span>
                    <span style="float: right">
                        ${place === 0 ? '' : `(${((time - first) / 1000).toPrecision(3)}s behind)`}
                    </span>
                </p>
            `;

            i++;
        }
    }

    async function getData () {

        const rawQ = await fetch('../backend/get-q.php');
        const newQ = (await rawQ.json()).sort((a, b) => a.time - b.time);
        if (newQ.length !== Q.length) {
            buzzer.play();
        }
        Q = newQ;

        draw();

        setTimeout( () => requestAnimationFrame(getData), 0);
    }

    getData();

    document.getElementById('clear').onclick = async () => {
        await fetch(`../backend/clear-q.php?password=${password}`);
        ding.play();
        Q = [];
        draw();
    }
}

if (password === '123') {
    main();
} else {
    window.location.assign('../');
}