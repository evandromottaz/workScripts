# workScripts
Scripts para resolver erros humanos.

links.js

O arquivo links fornece um script para resolver o problema de adicionar o redirect do plano ao invés de um link interno.
Também resolve o problema do sistema do liferay que gera um id único para o portlet de cadastro da promoção,
devido a mudança de ambiente... assim não importa qual seja o id único, sempre será o correto...

Usei Mutation Observer para capturar o portlet de promoções, visto que ele carrega depois de 3 segundos. Uma outra alternativa,
seria usar um timer... mas prefiri usar observer para aprender uma tecnologia nova e também deixar o código mais profissional.
