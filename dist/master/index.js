const QDIV = document.getElementById('q');

async function getData () {

    const rawQ = await fetch('../backend/get-q.php');
    const Q = await rawQ.json();
    console.log(Q);

    for (let name of Q) {

        QDIV.innerHTML += `
            <p class="q-element">
                ${name}
            </p>
        `;
    }

    setTimeout( () => requestAnimationFrame(getData), 100);
}

getData();