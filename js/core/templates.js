// js/core/templates.js
(function (global) {
  var Templates = {
    home: function () {
      return `
            <section class="hero">
                <div class="container">
                    <h1>Transformando Vidas, Construindo Futuros</h1>
                    <p>Nossa missão é criar um impacto positivo duradouro na comunidade, promovendo a educação, saúde e desenvolvimento social. Junte-se a nós!</p>
                    <a href="#/projetos" class="btn btn-lg">Conheça Nossos Projetos</a>
                </div>
            </section>

            <section id="about" class="about-section">
                <div class="container">
                    <h2>Sobre a Organização</h2>
                    <div class="content">
                        <div class="text-content">
                            <p>A ONG Solidária foi fundada em 2005 por um grupo de voluntários dedicados, com o objetivo de combater a desigualdade social e promover oportunidades para crianças e famílias em situação de vulnerabilidade. Desde então, crescemos e expandimos nossos programas, sempre com a paixão por fazer a diferença.</p>
                            <p>Nossa visão é uma sociedade mais justa e equitativa, onde todos tenham acesso a direitos básicos e oportunidades de desenvolvimento. Nossos valores fundamentais são integridade, solidariedade, transparência e respeito.</p>
                            <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:24px;">
                                <span class="badge badge-primary">Integridade</span>
                                <span class="badge badge-secondary">Solidariedade</span>
                                <span class="badge badge-info">Transparência</span>
                                <span class="badge badge-success">Respeito</span>
                            </div>
                            <a href="#/cadastro" class="btn btn-primary" style="margin-top:24px">Seja um Voluntário</a>
                        </div>
                        <img src="imagens/projeto-educacao.jpg" alt="Crianças sorrindo em um ambiente de aprendizado" />
                    </div>
                </div>
            </section>

            <section id="impact" class="impact-section">
                <div class="container">
                    <h2>Nosso Impacto em Números</h2>
                    <p>Com sua ajuda, alcançamos resultados significativos:</p>
                    <div class="impact-grid">
                        <div class="impact-item"><h3>+500</h3><p>Crianças Atendidas</p></div>
                        <div class="impact-item"><h3>+150</h3><p>Famílias Apoiadas</p></div>
                        <div class="impact-item"><h3>+2000</h3><p>Refeições Distribuídas</p></div>
                        <div class="impact-item"><h3>+80</h3><p>Voluntários Ativos</p></div>
                    </div>
                </div>
            </section>

            <section id="team" class="team-section">
                <div class="container">
                    <h2>Nossa Equipe</h2>
                    <p>Conheça os rostos por trás da ONG Solidária:</p>
                    <div class="team-grid">
                        <article class="team-member">
                            <img src="imagens/team-member-1.jpg" alt="Maria Silva" />
                            <h3>Maria Silva</h3><p>Fundadora & Presidente</p>
                        </article>
                        <article class="team-member">
                            <img src="imagens/team-member-2.jpg" alt="João Oliveira" />
                            <h3>João Oliveira</h3><p>Coordenador de Projetos</p>
                        </article>
                        <article class="team-member">
                            <img src="imagens/team-member-3.jpg" alt="Ana Souza" />
                            <h3>Ana Souza</h3><p>Gerente de Voluntariado</p>
                        </article>
                        <article class="team-member">
                            <img src="imagens/team-member-4.jpg" alt="Pedro Santos" />
                            <h3>Pedro Santos</h3><p>Comunicação e Marketing</p>
                        </article>
                    </div>
                </div>
            </section>

            <section id="contact" class="contact-section">
                <div class="container">
                    <h2>Entre em Contato</h2>
                    <div class="contact-info">
                        <p><strong>Endereço:</strong> Rua da Esperança, 123 - Centro, Cidade Futura - CF</p>
                        <p><strong>Telefone:</strong> <a href="tel:+5511987654321">(11) 98765-4321</a></p>
                        <p><strong>E-mail:</strong> <a href="mailto:contato@ongSolidaria.org.br">contato@ongSolidaria.org.br</a></p>
                    </div>
                    <div class="contact-map">
                        <img src="imagens/mapa-localizacao.jpg" alt="Mapa de localização da ONG" />
                    </div>
                    <div style="text-align:center; margin-top:32px">
                        <button class="btn btn-primary" data-open-contact>Enviar Mensagem</button>
                    </div>
                </div>
            </section>
            `;
    },

    projetos: function () {
      return `
            <section id="projects" class="projects-section">
                <div class="container">
                    <h1>Nossos Projetos Sociais</h1>
                    <p>Conheça as iniciativas que transformam vidas e comunidades:</p>
                    <div style="text-align:center; margin-bottom:32px">
                        <span class="tag" data-filter="all">Todos</span>
                        <span class="tag" data-filter="educacao">Educação</span>
                        <span class="tag" data-filter="saude">Saúde</span>
                        <span class="tag" data-filter="meio-ambiente">Meio Ambiente</span>
                        <span class="tag" data-filter="assistencia">Assistência Social</span>
                    </div>

                    <div class="project-grid">
                        <article class="project-card" data-category="educacao" id="educacao">
                            <img src="imagens/projeto-educacao.jpg" alt="Crianças em sala de aula" />
                            <div class="project-card-content">
                                <h3>Projeto Sementes do Amanhã</h3>
                                <span class="category">Educação</span>
                                <p>Oferecemos aulas de reforço escolar, oficinas de leitura e escrita para crianças e adolescentes.</p>
                                <button class="btn btn-primary" data-open-project="educacao">Saiba Mais</button>
                            </div>
                        </article>

                        <article class="project-card" data-category="saude" id="saude">
                            <img src="imagens/projeto-saude.jpg" alt="Pessoas recebendo atendimento médico" />
                            <div class="project-card-content">
                                <h3>Saúde na Comunidade</h3>
                                <span class="category">Saúde</span>
                                <p>Campanhas de vacinação, exames básicos e palestras sobre higiene e prevenção de doenças.</p>
                                <button class="btn btn-primary" data-open-project="saude">Saiba Mais</button>
                            </div>
                        </article>

                        <article class="project-card" data-category="meio-ambiente" id="meio-ambiente">
                            <img src="imagens/plantando-arvores.jpg" alt="Voluntários plantando árvores" />
                            <div class="project-card-content">
                                <h3>Verdejar o Futuro</h3>
                                <span class="category">Meio Ambiente</span>
                                <p>Conscientização ambiental, plantio de árvores e ações de limpeza em áreas verdes urbanas.</p>
                                <button class="btn btn-primary" data-open-project="meio-ambiente">Saiba Mais</button>
                            </div>
                        </article>

                        <article class="project-card" data-category="assistencia" id="assistencia">
                            <img src="imagens/distribuicao-alimentos.jpg" alt="Distribuição de alimentos" />
                            <div class="project-card-content">
                                <h3>Mesa Farta</h3>
                                <span class="category">Assistência Social</span>
                                <p>Coleta e distribuição de alimentos para famílias em situação de insegurança alimentar.</p>
                                <button class="btn btn-primary" data-open-project="assistencia">Saiba Mais</button>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            `;
    },

    cadastro: function () {
      return `
            <section class="registration-form">
                <div class="container">
                    <h1>Formulário de Cadastro</h1>
                    <p>Preencha o formulário abaixo para fazer parte da nossa comunidade.</p>

                    <div class="alert alert-info" style="display:none" id="infoAlert">
                        <span class="alert-icon">ℹ️</span>
                        <div class="alert-content">
                            <div class="alert-title">Informação</div>
                            <p>Todos os campos marcados são obrigatórios.</p>
                        </div>
                        <button class="alert-close" data-close-alert>&times;</button>
                    </div>

                    <form action="#" method="POST" id="registrationForm" novalidate>
                        <fieldset>
                            <legend>Dados Pessoais</legend>
                            <div class="form-group">
                                <label for="name">Nome Completo:</label>
                                <input type="text" id="name" name="name" placeholder="Seu nome completo" required aria-label="Nome Completo" />
                                <span class="error-message">Por favor, preencha seu nome completo.</span>
                            </div>
                            <div class="form-group">
                                <label for="email">E-mail:</label>
                                <input type="email" id="email" name="email" placeholder="seu.email@Solidaria.com" required aria-label="E-mail" />
                                <span class="error-message">Por favor, insira um e-mail válido.</span>
                            </div>
                            <div class="form-group">
                                <label for="cpf">CPF:</label>
                                <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" title="Formato: 000.000.000-00" required aria-label="CPF" />
                                <span class="error-message">CPF inválido. Use o formato: 000.000.000-00</span>
                            </div>
                            <div class="form-group">
                                <label for="phone">Telefone:</label>
                                <input type="tel" id="phone" name="phone" placeholder="(00) 00000-0000" pattern="\(\d{2}\) \d{4,5}-\d{4}" title="Formato: (00) 00000-0000 ou (00) 0000-0000" required aria-label="Telefone" />
                                <span class="error-message">Telefone inválido. Use o formato: (00) 00000-0000</span>
                            </div>
                            <div class="form-group">
                                <label for="dob">Data de Nascimento:</label>
                                <input type="date" id="dob" name="dob" required aria-label="Data de Nascimento" />
                                <span class="error-message">Por favor, selecione sua data de nascimento.</span>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Endereço</legend>
                            <div class="form-group">
                                <label for="address">Endereço Completo:</label>
                                <input type="text" id="address" name="address" placeholder="Rua, número, complemento" required aria-label="Endereço Completo" />
                                <span class="error-message">Por favor, preencha seu endereço.</span>
                            </div>
                            <div class="form-group">
                                <label for="cep">CEP:</label>
                                <input type="text" id="cep" name="cep" placeholder="00000-000" pattern="\d{5}-\d{3}" title="Formato: 00000-000" required aria-label="CEP" />
                                <span class="error-message">CEP inválido. Use o formato: 00000-000</span>
                            </div>
                            <div class="form-group">
                                <label for="city">Cidade:</label>
                                <input type="text" id="city" name="city" placeholder="Sua cidade" required aria-label="Cidade" />
                                <span class="error-message">Por favor, preencha sua cidade.</span>
                            </div>
                            <div class="form-group">
                                <label for="state">Estado:</label>
                                <select id="state" name="state" required aria-label="Estado">
                                    <option value="">Selecione o Estado</option>
                                    <option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option><option value="ES">Espírito Santo</option><option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option><option value="MT">Mato Grosso</option><option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option><option value="PA">Pará</option><option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option><option value="PE">Pernambuco</option><option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option>
                                </select>
                                <span class="error-message">Por favor, selecione um estado.</span>
                            </div>
                        </fieldset>

                        <div class="form-actions">
                            <button type="reset" class="btn">Limpar</button>
                            <button type="submit" class="btn">Enviar Cadastro</button>
                        </div>
                    </form>
                </div>
            </section>
            `;
    },
  };

  global.AppTemplates = Templates;
})(window);
