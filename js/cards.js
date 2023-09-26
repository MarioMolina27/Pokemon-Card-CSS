const cardContainer = document.getElementById('card-container');

// Carga los datos desde el archivo JSON local
fetch('./json/pokemon.json') // Ruta correcta para acceder al archivo JSON
    .then(response => response.json())
    .then(data => {
        data.forEach(cardInfo => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            createCard(cardInfo, cardElement);
            cardContainer.appendChild(cardElement);
        })
        createAnimations();
    })
    .catch(error => console.error('Error al cargar los datos:', error));

    function createCard(cardInfo, cardElement)
    {
        let evolution = 'evolution';
            

            if(cardInfo.stage==='BASIC')
            {
                evolution = 'no-evolution'
            }
            
            let moves = generateMoves(cardInfo.moves);
            cardElement.innerHTML =`
            <div class="card-inner">
                <div class ="card-header">
                    <div class="header-left">
                        <div class="pokemon-stage">
                            <div class="pokemon-stage-name">
                                <p class="text-stage">${cardInfo.stage}</p>
                            </div>
                            <div class="preevolution-container ${evolution}">
                                <div class="preevolution-image-container">
                                    <img src="${cardInfo.preevolution.image}" alt="${cardInfo.preevolution.name}" class="preevolution-img">
                                </div>
                                <div class="preevolution-text-container">
                                    <p>Evolves from ${cardInfo.preevolution.name}</p>
                                </div>
                            </div>
                        </div>
                        <div class="pokemon-name">
                            <p class="text-pokemon-name">${cardInfo.name}</p>
                        </div>
                    </div>
                    <div class="pokemon-hp">
                        <p class="title-hp">HP</p>
                        <p class="hp-value">${cardInfo.hp}</p>
                        <img src="${cardInfo.type.image}" alt="${cardInfo.type.name}-type" class="type-img">
                    </div>
                </div>
                <div class="image-section">
                    <img src="${cardInfo.image}" alt="${cardInfo.name}" class="pokemon-img">
                    <div class="img-info">
                        <p>${cardInfo.number}</p>
                        <p>${cardInfo.info.category}</p>
                        <p>${cardInfo.info.height}</p>
                        <p>${cardInfo.info.weight}</p>
                    </div>
                </div>
                <div class="movements-section">
                    ${moves}
                </div>
                <div class="weak-retreat-section">
                    <div class="weak-and-resistance-container">
                        <div class="weak-container">
                            <p class="weakness-text">weakness</p>
                            ${returnWeekness(cardInfo.weakness)}
                        </div>
                        <div class="resistance-container">
                            <p class="resistance-text">resistance</p>
                        </div>
                    </div>
    
                    <div class="retreat-container">
                        <p class="retreat-text">retreat</p>
                        ${returnRetreat(cardInfo.retreat)}
                    </div>
                </div>
                <div class="card-footer">
                    <div class="footer-left">
                        <p class="ilustrator-name">${cardInfo.footer.illustrator}</p>
                        <div class="rarety-variables">
                            <img src="${cardInfo.footer.rarity.symbol}" alt="normal-type" class="rarerty-simbols-img">
                            <p>${cardInfo.footer.rarity.number}</p>
                            <img src="${cardInfo.footer.rarity.symbol2}" alt="normal-type" class="rarerty-simbols2-img">
                        </div>
                        <p class="copyright">${cardInfo.footer.copyright}</p>
                    </div>
                    <div class="footer-right">
                        <p>
                            ${cardInfo.footer.additionalInfo}
                        </p>
                    </div>
                </div>
            </div>`;
    }
    function generateMoves(pokemonMoves)
    {
        let moves ="";
        pokemonMoves.forEach(m => {
            let move = `
            <div class="move">
            <div class="type">
               ${returnTypeMoves(m.type)}
            </div>
            <div class="movement-name">
                <p>${m.name}</p>
            </div>
            <div class="movement-damage">
                <p>${m.damage}</p>
            </div>
            </div>
            <p class="move-description">${m.effect}</p>`
            moves = moves + "\n" + move;
        });
        return moves;
    }

    function returnTypeMoves(typeMoves)
    {
        let html="";
        typeMoves.forEach(t => {
            html = html + "\n" + `<img src="./img/${t.toLowerCase()}-type.png" alt="normal-type" class="type-move-img">`
        });
        return html;
    }

    function returnWeekness(weakness)
    {
        let html = "";
    
        weakness.forEach(w => {
            html = html + "\n" + `<img src="img/${w.type.toLowerCase()}-type.png" alt="${w.type.toLowerCase()}-type" class="type-img-mini">
            <p class="x-damage">x ${w.multiplier}</p>`;
        });

        return html;
    }

    function returnRetreat(retreats)
    {
        let html = "";
        retreats.forEach(r => {
            html = html + "\n" + `<img src="./img/${r.type}-type.png" alt="normal-type" class="type-img-mini">`;
        });
        return html;
    }