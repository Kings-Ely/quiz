
async function main () {
    const QDIV = document.getElementById('q');

    let Q = [];

    function draw () {
        QDIV.innerHTML = '';

        if (!Q.length) return;
        let first = Q[0].time;

        for (let press of Q) {
            const { name, time } = press;
            const place = Q.indexOf(press);

            QDIV.innerHTML += `
                <p class="q-element">
                    ${place+1} ${name} ${place === 0 ? '' : `(${((time-first)/1000).toPrecision(3)}s behind)`}
                </p>
            `;
        }
    }

    async function getData () {

        const rawQ = await fetch('../backend/get-q.php');
        Q = (await rawQ.json()).sort((a, b) => a.time - b.time);
        draw();

        setTimeout( () => requestAnimationFrame(getData), 0);
    }

    getData();

    document.getElementById('clear').onclick = async () => {
        console.log('cleaning...');
        await fetch('../backend/clear-q.php');

        console.log('cleared');
        Q = [];
        draw();
    }
}

if (prompt('Password') === '123') {
    main();
}