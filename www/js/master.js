	function DelStorage(mat){
		var cadastros = JSON.parse(window.localStorage.getItem('JSON_Cad')); //Retorna um vetor de objetos!
		for	(index = 0; index < cadastros.length; index++) {				
			if(cadastros[index].matricula == mat)
				cadastros.splice(index,1);
		}
		//Apos remover o item solicitado salva no banco!
		window.localStorage.setItem('JSON_Cad', JSON.stringify(cadastros));
	}
		
	function AddStorage(mat,senha){			
		var cadastros = window.localStorage.getItem('JSON_Cad');
		var object = {matricula: mat, senha: senha};
		var localData = [];
		localData.push(object);
		
		//Se for o primeiro registro!
		if(cadastros === null){
			 window.localStorage.setItem('JSON_Cad', JSON.stringify(localData));
		}
		else{
			cadastros = JSON.parse(cadastros);
			cadastros.push(object);
			window.localStorage.setItem('JSON_Cad', JSON.stringify(cadastros));
		}		
	}
		
	function GetStorage(){
		if(localStorage.getItem('JSON_Cad') && localStorage.getItem('JSON_Cad') !== '') {
			var cadastros = JSON.parse(window.localStorage.getItem('JSON_Cad'));
			var cont = cadastros.length;
			console.log('Storage com '+cont+' Dados');
			return cadastros;
		}else{
			console.log('Storage Vazio');
			return false;
		}		
	}
		
	function ClrStorage(){
		window.localStorage.clear();
	}
        
	function UpdateQtdeItems(){
		var x = GetStorage();
		
		if(x){
			if(x.length < 2)
				$('#qtdereg').html('(Max: '+x.length+' de 2)');
			else
				$('#qtdereg').html('(Max: <font color="red"><b>2 de 2</b></font>)');
		}  
		else{
			$('#qtdereg').html('(Max: 0 de 2)');
		}
	}
        
	function QtdeItems(){
		var x = GetStorage();
		if(x){
			console.log(x.length);
			return x.length;
		}else{
			return 0;
		}
	}
		
	//Permitido somente 2 cadastros!
	function AdicionarCad(mat,senha){
		if(QtdeItems() < 2){
			AddStorage(mat,senha);
			
			$('#mat').val('');
			$('#senha').val('');
			
			//Registro adicionado, falta agora atualizar a lista!
			var items = 0;
			var cadastros = GetStorage();
			
			if(cadastros){		
				items = cadastros.length;
			}
			
			var html = '';
			//Preenche a Lista com os Cadastros armazenados!			
			for(index = 0; index < cadastros.length; index++) {
				html += '<div class="ui-btn-text">Matricula: '+cadastros[index].matricula+'&nbsp;&nbsp;'+				
						'<a id="search" data-role="button" data-inline="true" data-iconpos="notext" data-icon="search" data-iconpos="right" data-theme="b" onclick="PegaExtrato('+cadastros[index].matricula+','+cadastros[index].senha+');" rel="external">Consultar</a>'+
						'<a data-role="button" data-inline="true" data-iconpos="notext" data-icon="delete" data-iconpos="right" data-theme="b" onclick="ExcluirCad('+cadastros[index].matricula+');" rel="external">Excluir</a>'+																 
						//'<a href="#popupMenu" id="popupDefault" data-rel="popup" data-role="button" data-inline="true" data-transition="pop" data-icon="gear" data-theme="b" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" aria-haspopup="true" aria-owns="#popupMenu"><span class="ui-btn-text">Op&ccedil;&otilde;es</span></a>'+	
						'</div>';
			}
			UpdateQtdeItems();
			$('#listCad').html(html).trigger('create');
		}
		else{
			alert('O maximo de registros (2) foi alcancado!');
		}
	}
		
	function ExcluirCad(mat){
		DelStorage(mat);
		//Registro excluido, falta agora atualizar a lista!
		var items = 0;
		var cadastros = GetStorage();
		var html = '';
		
		if((cadastros) && (cadastros.length > 0)){		
			items = cadastros.length;
			//Preenche a Lista com os Cadastros armazenados!			
			for(index = 0; index < cadastros.length; index++) {
				html += '<div class="ui-btn-text">Matricula: '+cadastros[index].matricula+'&nbsp;&nbsp;'+				
					'<a id="search" data-role="button" data-inline="true" data-iconpos="notext" data-icon="search" data-iconpos="right" data-theme="b" onclick="PegaExtrato('+cadastros[index].matricula+','+cadastros[index].senha+');" rel="external">Consultar</a>'+
					'<a data-role="button" data-inline="true" data-iconpos="notext" data-icon="delete" data-iconpos="right" data-theme="b" onclick="ExcluirCad('+cadastros[index].matricula+');" rel="external">Excluir</a>'+																 
					//'<a href="#popupMenu" id="popupDefault" data-rel="popup" data-role="button" data-inline="true" data-transition="pop" data-icon="gear" data-theme="b" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" aria-haspopup="true" aria-owns="#popupMenu"><span class="ui-btn-text">Op&ccedil;&otilde;es</span></a>'+	
					'</div>';
			}
		}
		else{
			 html += '<div class="ui-btn-text">Nenhum registro salvo!</div>';
		}			
		UpdateQtdeItems();
		$('#listCad').html(html).trigger('create');
	}
		
	$(document).ready(function() {
		var html = '';            			
		var items = 0;
		$('#search').parent().css('margin-left','5px');
		
		var cadastros = GetStorage();
		console.log(cadastros);
		
		if((cadastros === false) || (cadastros.length == 0)){
			html += '<div class="ui-btn-text">Nenhum registro salvo!</div>';
			
		}else{				
			items = cadastros.length;
			console.log('tem '+items+' items');
			for	(index = 0; index < cadastros.length; index++) {
				html += '<div class="ui-btn-text">Matricula: '+cadastros[index].matricula+'&nbsp;&nbsp;'+				
						'<a id="search" data-role="button" data-inline="true" data-iconpos="notext" data-icon="search" data-iconpos="right" data-theme="b" onclick="PegaExtrato('+cadastros[index].matricula+','+cadastros[index].senha+');" rel="external">Consultar</a>'+
						'<a data-role="button" data-inline="true" data-iconpos="notext" data-icon="delete" data-iconpos="right" data-theme="b" onclick="ExcluirCad('+cadastros[index].matricula+');" rel="external">Excluir</a>'+																 
						//'<a href="#popupMenu" id="popupDefault" data-rel="popup" data-role="button" data-inline="true" data-transition="pop" data-icon="gear" data-theme="b" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" aria-haspopup="true" aria-owns="#popupMenu"><span class="ui-btn-text">Op&ccedil;&otilde;es</span></a>'+	
						'</div>';
			}
		}
		
		$('#listCad').html(html).trigger('create');;
		
		//var items = $('#lista li').size();						
		
		if(items < 2)
			$('#qtdereg').html('(Max: '+items+' de 2)');
		else
			$('#qtdereg').html('(Max: <font color="red"><b>2 de 2</b></font>)');
	
		//Clique do Botao de Consulta!
		$('#consultar').click(function(){
			var matricula = $('#mat').val();
			var senha = $('#senha').val();
			//var items = $('#lista li').size();
			
			var items = 0;
			var cadastros = GetStorage();
			
			if(cadastros){
				items = cadastros.length;
			}
			
			var check = $('#chkSave').is(':checked');			
			
			if((matricula != '') && (senha != '')){
				if(check){									
					AdicionarCad(matricula,senha);                                        
				}
				PegaExtrato(matricula,senha);
			}else{
				alert('Precisa preencher os dados de matricula e senha!');
				$('#mat').val('');
				$('#senha').val('');
			}		
		});
			
            /*
			$("#popupli").on("click", function(e) {
				//e.preventDefault();
				//function popup(){
				$('<div>').simpledialog2({
					mode:"blank",
					headerText:"Opcoes",
					dialogForce: true,
					//showModal:false,
					//forceInput:true,
					headerClose:true,
					blankContent:"<ul data-role='listview'><li><a href=''>Consultar</a></li><li><a href=''>Deletar</a></li></ul>"
				});
			});
			//}
			/*
			$('#btnHome').click(function(){
				$.mobile.changePage($("#netstudent_main"),'pop');
			});                        
			*/
	});
        
	function ExibeHome(){
		console.log('chamou pagina home');
		$.mobile.changePage($("#netstudent_main"),'pop');
	}
	
	function ExibeInfo(){
		console.log('chamou pagina info');
		$.mobile.changePage($("#info"),'pop');
	}
	
	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				break;
			}
		}
	}
		
	//Ainda falta testar os erros que podem acontecer durante uma consulta!
	/*
		Falta de Conexao com Internet!
		NetStudent inacessível!
		Usuario ou Senha Incorreta(De acordo com retorno do NetStudent)
		
	*/				
	/*Para funcionar deve especificar o header <?php header('Access-Control-Allow-Origin: *'); ?> na api! (NetStudent.php)*/
	function PegaExtrato(matricula,senha){
		
		ExibeLoading();
		
		$.getJSON("http://www.aisiz.org/webservice/netstudent/NetStudent.php?matricula="+matricula+"&senha="+senha,
		//$.getJSON("http://localhost/app/NetStudent/json_falso.php",
		function(data, status, xhr){
			//if(status == 'success'){
				var html = '';				
				var json = data;
				var html = '';
				HideLoading();
				
				var count = Object.keys(data).length;
				console.log('Json retornou vetor de '+count+' indices!');
				
				//Se o Json retornou so com um indice entao retornou com erro!
				if(count === 1){
					console.log('chamou pagina de erro');
					$.mobile.changePage($("#error"),'pop');
					//var json_parsed = JSON.parse(json);
					
					$.each(json, function (i, item) {
						console.log('valor do json com erro: '+item);
						//Exibe o erro ao usuario!
						var aux = '<center>'+item+'</center>';
						$('#errorContent').html(aux).trigger('create');
					});
				}else{
					//sleep(5000);
					$('#dvaluno').html('Aluno: '+json[0]);
					console.log(data);
					$.each(json[1], function (i, item) {
						
						html += '<li><div id="resultsContainer" data-role="collapsible" data-collapsed="true">'
							+'<h3>'+item.disciplina+'</h3><ul data-role="listview" data-theme="c">'
							+'<li data-theme="b">Situa&ccedil;&atilde;o</li>'
							+'<li>'+item.status+'</li>'
							+'<li data-theme="b">1° AV (1° Avalia&ccedil;&atilde;o) [N/C](Nota ou Conceito)</li>'
							+'<li>'+item._1av_nc+'</li><li data-theme="b">1° AV (1° Avalia&ccedil;&atilde;o) [AD] (Aulas Dadas)</li>'
							+'<li>'+item._1av_ad+'</li><li data-theme="b">1° AV (1° Avalia&ccedil;&atilde;o) [F] (Faltas)</li>'
							+'<li>'+item._1av_f+'</li><li data-theme="b">2° AV (2° Avalia&ccedil;&atilde;o) [N/C](Nota ou Conceito)</li>'
							+'<li>'+item._2av_nc+'</li><li data-theme="b">2° AV (2° Avalia&ccedil;&atilde;o) [AD] (Aulas Dadas)</li>'
							+'<li>'+item._2av_ad+'</li><li data-theme="b">2° AV (2° Avalia&ccedil;&atilde;o) [F] (Faltas)</li>'
							+'<li>'+item._2av_f+'</li><li data-theme="b">2CH1A (2° Chamada 1° Avalia&ccedil;&atilde;o) [N/C](Nota ou Conceito)</li>'
							+'<li>'+item._2ch1a_nc+'</li><li data-theme="b">2CH1A (2° Chamada 1° Avalia&ccedil;&atilde;o) [AD] (Aulas Dadas)</li>'
							+'<li>'+item._2ch1a_ad+'</li><li data-theme="b">2CH1A (2° Chamada 1° Avalia&ccedil;&atilde;o) [F] (Faltas)</li>'
							+'<li>'+item._2ch1a_f+'</li><li data-theme="b">2CH2A (2° Chamada 2° Avalia&ccedil;&atilde;o) [N/C](Nota ou Conceito)</li>'
							+'<li>'+item._2ch2a_nc+'</li><li data-theme="b">2CH2A (2° Chamada 2° Avalia&ccedil;&atilde;o) [AD] (Aulas Dadas)</li>'
							+'<li>'+item._2ch2a_ad+'</li><li data-theme="b">2CH2A (2° Chamada 2° Avalia&ccedil;&atilde;o) [F] (Faltas)</li>'
							+'<li>'+item._2ch2a_f+'</li><li data-theme="b">MS (M&eacute;dia Semestral) [N/C](Nota ou Conceito)</li>'
							+'<li>'+item.ms_nc+'</li><li data-theme="b">MS (M&eacute;dia Semestral) [AD] (Aulas Dadas)</li>'
							+'<li>'+item.ms_ad+'</li><li data-theme="b">MS (M&eacute;dia Semestral) [F] (Faltas)</li>'
							+'<li>'+item.ms_f+'</li><li data-theme="b">PF (Prova Final) [N/C](Nota ou Conceito)</li>'
							+'<li>'+item.pf_nc+'</li><li data-theme="b">PF (Prova Final) [AD] (Aulas Dadas)</li>'
							+'<li>'+item.pf_ad+'</li><li data-theme="b">PF (Prova Final) [F] (Faltas)</li>'
							+'<li>'+item.pf_f+'</li><li data-theme="b">MF (M&eacute;dia Final) [N/C](Nota ou Conceito)</li>'
							+'<li>'+item.mf_nc+'</li><li data-theme="b">MF (M&eacute;dia Final) [AD] (Aulas Dadas)</li>'
							+'<li>'+item.mf_ad+'</li><li data-theme="b">MF (M&eacute;dia Final) [F] (Faltas)</li>'
							+'<li>'+item.mf_f+'</li><li data-theme="b">TOTAIS [AD](Aulas Dadas)</li>'
							+'<li>'+item.tot_ad+'</li><li data-theme="b">TOTAIS [F] (Faltas)</li>'
							+'<li>'+item.tot_f+'</li><li data-theme="b">TOTAIS [%] (Percentual de Faltas)</li>'
							+'<li>'+item.tot_porc+'</li></ul></div></li>';											
					});
					
					$('#listView1').listview().listview('refresh');
					//$('#listView1').empty().html(html).listview('refresh');
					$('#listView1').empty().html(html).trigger('create');
					console.log(html);
					$.mobile.changePage("#netstudent_extrato");
				}
			/*
			}
			else if(status == 'timeout'){
				alert('Falhou ao conectar no NetStudent!');
			}
			else if (status == "error" || status == "parsererror" ){
				alert('Aconteceu um Erro!');
			}
			*/
			console.log('data: '+data+' xhr: '+xhr+' status: '+status);
			
						
			
		//fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + textStatus); console.log(textStatus+'/'+jqXHR+'-'+errorThrown); HideLoading(); })			
		}).fail(function(jqXHR, textStatus, errorThrown) { 
			//alert('Falhou ao acessar NetStudent!'); 
			var aux = '<center>Falha de Conexao! Verifique sua Internet!</center>';
			$('#errorContent').html(aux).trigger('create');
			console.log(textStatus+'/'+jqXHR+'-'+errorThrown); 
			HideLoading(); 
		})			
	}
		
	function ExibeLoading(){
		$.mobile.loading( "show", {
		  text: "Carregando...",
		  textVisible: true,
		  theme: "b",
		  html: ""
		});
		console.log('mostrou loading');
	}
	
	function HideLoading(){
		$.mobile.loading( "hide", {			  
		});
		console.log('escondeu loading');
	}
	
	
	function FecharApp(){
		navigator.app.exitApp();
	}
	/*
	document.addEventListener("backbutton", function () { 
         navigator.notification.confirm(
             'Deseja Sair?', 
             onConfirmQuit, 
             'QUIT TITLE', 
             'Sim,Nao'  
         );
     }, true); 


    function onConfirmQuit(button){
        if(button == "1"){
            navigator.app.exitApp(); 
        }
    }
	*/
	/*
	document.addEventListener('deviceready', function(e,d){
		//alert('PG Ready');
		$('#btnExit').click(function() {
			console.log('chamou fechar App');
			navigator.app.exitApp();
			return true;
		});
	}, false);
		
	$(document).ready(function() {
		alert('JQ Ready');
	});
	*/
