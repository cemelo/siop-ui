//CLASSE: PainelAbas

var paineisAbas = new Array();

function PainelAbas(vElementoDOM) {
	console.log('Criando instância de PainelAbas com ' + vElementoDOM);
	this.elementoDOM = vElementoDOM;

	//carregando a bandeja do painel
	this.divBandejaRotulos = this.elementoDOM.querySelector('.bandejaDeRotulos');
	if (this.divBandejaRotulos == null) {
		throw "Não foi encontrado elemento da classe .bandejaDeRotulos dentro do painel";
	}

	//carregando as div que contem as abas do painel
	this.abas = new Array();
	this.divAbas = this.elementoDOM.querySelector('.abas');
	if (this.divAbas == null) {
		throw "Não foi encontrado elemento da classe .abas dentro do painel";
	}

	//carregando as abas do painel
	var elementosAbas = this.divAbas.getElementsByClassName('aba');
	console.log('Abas encontradas para o painel ' + this.elementoDOM + ': ' + elementosAbas.length);
	for (var i = 0; i < elementosAbas.length; i++) {
		this.abas[i] = new Aba(elementosAbas[i]);
	}

	this.onScroll = function() {
		var topoDaBarra = window.scrollY;
		var topoDoPainel = this.elementoDOM.offsetTop;
		console.log(topoDaBarra + "," + topoDoPainel);
		if (topoDaBarra > topoDoPainel) {
			//fixar área do rotulos
			this.divBandejaRotulos.classList.add('sticky');
			this.divBandejaRotulos.style.width = getComputedStyle(this.divBandejaRotulos.parentNode, null).width;

			for (var i = 0; i < this.abas.length; i++) {
				var aba = this.abas[i];
				var topoDaAba = aba.elementoDOM.offsetTop;
				if (topoDaBarra > topoDaAba) {
					aba.divRotulo.classList.add('sticky');
				} else {
					aba.divRotulo.classList.remove('sticky');
				}
			}
		} else {
			this.divBandejaRotulos.classList.remove('sticky');
		}
	};

}

function Aba(vElementoDOM) {
	console.log('Criando instância de Aba com ' + vElementoDOM);
	this.elementoDOM = vElementoDOM;
	//carregando o rótulo da aba
	var elementoRotulo = this.elementoDOM.querySelector('.rotulo');
	if (elementoRotulo == null) {
		throw "Não foi encontrado um rótulo para esta aba: " + this.elementoDOM;
	}
	this.divRotulo = elementoRotulo;
	//carregando o conteúdo da aba
	var elementoConteudo = this.elementoDOM.querySelector('.conteudo');
	if (elementoConteudo == null) {
		throw "Não foi encontrado um conteúdo para esta aba: " + this.elementoDOM;
	}
	this.divConteudo = elementoConteudo;
}

function paineisAbasOnScrollListener() {
	for (var i = 0; i < paineisAbas.length; i++) {
		paineisAbas[i].onScroll();
	}
}

function carregarPaineisAbas() {
	var elementosPaineisAbas = document.getElementsByClassName('painelAbas');
	console.log('Paineis de Abas encontrados: ' + elementosPaineisAbas.length);
	for (var i = 0; i < elementosPaineisAbas.length; i++) {
		paineisAbas[i] = new PainelAbas(elementosPaineisAbas[i]);
	}
	document.addEventListener("scroll", paineisAbasOnScrollListener);
}

function onScroll(e) {
	var abas = document.getElementsByClassName('labelContainer');
	for (var i = 0; i < abas.length; ++i) {
		var aba = abas[i];
		if (window.scrollY >= aba.offsetTop) {
			aba.classList.add('sticky');
			aba.style.width = getComputedStyle(aba.parentNode, null).width;
		}
	}

	var abas = document.getElementsByClassName('labelContainer sticky');
	for (var i = 0; i < abas.length; ++i) {
		var aba = abas[i];
		if (window.scrollY < aba.parentNode.offsetTop) {
			aba.className = 'labelContainer';
		}
	}

}

//document.addEventListener('scroll', onScroll);
document.addEventListener("DOMContentLoaded", carregarPaineisAbas, false);
