
const quotes = document.querySelector('#quotes');
const button = document.querySelector('#click');
const shareButton = document.querySelector('#share');

const addStoicQuote = async () => {
    const contentQuotes = document.querySelector('#quotes');
    contentQuotes.innerHTML = ""
    const quoteText = await fetchStoicQuote();
    // const newP = document.createElement('P');
    // newP.append(`"${quoteText[0]}"`);
    const renderQuote = `
        <div>
            <p class="has-text-grey-lighter">${quoteText[0]}</p>
            <p class="is-size-5 has-text-grey-lighter author">${quoteText[1]}</p>
            <figure class="image is-128x128 is-inline-block mx-0 my-0">
                <img class="is-rounded" src="images/${quoteText[2]}"></img>
            </figure>
        </div>
    `
    contentQuotes.innerHTML = renderQuote;
}

const fetchStoicQuote = async () => {
    try {
        const res = await fetch('https://randomstoicquotesapi.herokuapp.com/api/v1/quotes');
        const data = await res.json();
        const randomNumber = Math.floor(Math.random()*data.data.length);
        const quoteText = data.data[randomNumber].attributes.text;
        const authorID = data.data[randomNumber].relationships.author.data.id;
        const included = data.included;
        let author = "";
      
        for(let i = 0; i < included.length; i++) {
          const obj = included[i];
          if( authorID === obj.id ) {
            author = obj.attributes.name;
          }
        }

        for(let i = 0; i < included.length; i++) {
            const obj = included[i];
            if( authorID === obj.id ) {
              image = obj.attributes.image;
            }
          }
        const arrQuote =  [quoteText, author, image]
   
        return arrQuote;
        

    }
    catch(e) {
        console.log("SOMETHING WENT WRONG")
    }
}

button.addEventListener('click', addStoicQuote)
