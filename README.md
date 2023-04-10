[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10782732&assignment_repo_type=AssignmentRepo)
# Lab 02 - *Shaders* em *Three.js*

# Para rodar é só ativar os ervidor na pasta: **dist/client**.

## Atividades Extras:

 1. Com base no exemplo do terreno do Lab02 (*vertex shader*), faça o que se pede:

   1. Crie um terreno mais denso, ou seja, com mais amostras (vértices);
   1. Defina a cor de cada vértice com base na altura do terreno, como um mapa de relevo de um atlas (como na Figura 1);
   1. Modifique a função de geração do terreno definida no *shader* para que gere outro tipo de terreno menos regular.

<img src="./imgs/TerrenoColorido.png">

Figura 1.

2. Usando como base o exemplo do desenho do circulo (*fragment shader*), faça o que se pede:

   1. Produza um padrão de quadriculado preto e branco (tabuleiro de xadrez) cujo tamanho de cada quadrado seja definido pelo usuário atraves da interface gráfica (tal qual o raio do circulo);
   1. Produza um padrão de losangos coloridos como os da Figura 3. 


<img src="./imgs/TabuleiroXadrez.png" width="250" height="250">

Figura 2.

<img src="./imgs/Losangos.png" width="250" height="250">

Figura 3.

Duvidas devem ser encaminhadas no *Discord* da disciplina, no canal de **dúvidas-prática**.

> Atenção a data de entrega!!

## Referências:

	https://threejs.org/docs/index.html?q=shader#api/en/materials/ShaderMaterial

	https://threejs.org/manual/?q=shader#en/shadertoy

	https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html

	https://registry.khronos.org/OpenGL-Refpages/gl4/
