const CurrencyFormat = (number) => {
    return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

export default CurrencyFormat