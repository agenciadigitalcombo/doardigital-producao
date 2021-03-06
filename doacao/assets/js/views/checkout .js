import adm from "../../../../../static/js/api/adm.js"
const { required, minLength, between, email } = window.validators

export default {
	template: `
		<div :style="{ backgroundColor: backgroundColor }">

			<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
				<div class="post d-flex flex-column-fluid" id="kt_post">
					<div id="kt_content_container" class="container-xxl">
						<div class="text-center mb-8 mb-xl-5">
								<img class="rounded" style="width: 150px;" v-bind:src="logo">
								</div>
								<div class="card mb-5 mb-xl-10">
									<div class="card-body">
										<div class="row gx-9 gy-6">
											<div class="col-xl-6">
												<div>
													<div class="card-title mb-5">
														<h3>Escolha tipo</h3>
													</div>
													<div class="fv-row">
														<div class="btn-group w-100" data-kt-buttons="true"
															data-kt-buttons-target="[data-kt-button]">
                                                        <div v-if="temporario =='nao'">
															<input v-model="mensal" type="radio" class="btn-check"
																name="radio_buttons_2" value="1" checked="checked"
																id="kt_radio_buttons_2_option_1" />
															<label
																class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center mb-5"
																for="kt_radio_buttons_2_option_1">
																<span class="d-block fw-bold text-start">
																	<span class="text-dark fw-bolder d-block fs-3">DOAÇÃO MENSAL</span>
																</span>
															</label>
                                                        </div>

															<input v-model="mensal" type="radio" class="btn-check"
																name="radio_buttons_2" value="0"
																id="kt_radio_buttons_2_option_2" />
															<label
																class="btn btn-outline btn-outline-dashed btn-outline-default p-5 d-flex align-items-center mb-5"
																for="kt_radio_buttons_2_option_2">
																<span class="d-block fw-bold text-start">
																	<span class="text-dark fw-bolder d-block fs-3">DOAÇÃO UNICA</span>
																</span>
															</label>
														</div>
													</div>

												</div>
												<div>
													<div class="card-title mt-10">

														<h3>Escolha Valor para Doação</h3>
													</div>
			

													<div class="d-flex flex-column">

														<div class="row mt-5">

															<div class="col-lg-4  mb-lg-0" v-for="listar in filtraPlano" :key="listar.id">

															<label 
																class="btn btn-outline btn-outline-dashed d-flex flex-stack text-start p-5 mb-5">
																<div class="d-flex align-items-center me-2">
																	<div
																		class="form-check form-check-custom form-check-solid form-check-primary me-6">
																		<input v-on:click="setarPlano(listar)"  v-model="amount" :value="listar.amount"    
																			class="form-check-input" type="radio" name="plan" />
																			</div>

																	<div class="flex-grow-1">
																		<div class="fw-bold opacity-100">{{ listar.amount | is_price }} </div>
																	</div>
																</div>
															</label>
														</div> 
																				 

														<div class="col-lg-4 mb-10 mb-lg-0" v-if="mensal !== '1'">

															<label
																class="btn btn-outline btn-outline-dashed d-flex flex-stack text-start p-6">

																<div class="d-flex align-items-center me-2">

																	<div
																		class="form-check form-check-custom form-check-solid form-check-primary me-6">
																		<input v-model="valor" class="form-check-input"  
																			type="radio" name="plan" value="0" />
																	</div>

																	<div class="flex-grow-1">
																		<div class="fw-bold opacity-100">OUTRO</div>
																	</div>
																</div>
															</label>
														</div>
													</div>

												</div>
											</div>
										</div>

										<div class="col-xl-6">
											<div class="mb-10" v-if="valor === '0' && mensal !== '1'">
												<div class="card-title mb-5">
													<h3>Informe um valor, mínimo R$ 20,00. </h3>
												</div>
												
												<input v-model.trin="$v.valor_digitado.$model" type="text" @input="money" required 
												:class=" {'is-invalid':$v.valor_digitado.$error, 'is-valid':!$v.valor_digitado.$invalid }"
												 class="form-control form-control-solid p-5" placeholder="00.00"/>
												 <p class="erro_texte">
												 {{minimoalerta}}
												 </p>
											</div>
											<div class="card-title mb-5">
												<h3>Informacao</h3>
											</div>
											<div class="mb-10">
												<label for="exampleFormControlInput1" class="required form-label">E-mail</label>
												<input v-model.trin="$v.email.$model" type="email" class="form-control form-control-solid p-5"
												:class=" {'is-invalid':$v.email.$error, 'is-valid':!$v.email.$invalid }"
												placeholder="Email" />

													
												<div class="erros" v-if="$v.email.$error">
												<div class="erro_texte" v-if="!$v.email.required">
												email é necessária</div>
												<div class="erro_texte" v-else-if="!$v.email.isUnique ">
											  este email não é válido ..
													</div>
											</div>

											<div class="sucesso_texte" v-else> 
													
												</div>

											</div>
											<div>
								  


										 <div class="d-flex"> 
										 <button style="width: 100%;" class="btn btn-success p-5" type=" submit" @click="descartavel()"
											 :disabled="submitStatus === 'PENDING'">PROSEGUIR...!</button>									 
									 </div>	

									 <div>
									 <p class="typo__p" v-if="submitStatus === 'OK'"> 
									 </p>
									 <p class="erro_texte" v-if="submitStatus === 'ERROR'">
									 certifique que o valor e o E-email está preenchido corretamente 
									 </p>
									 <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...
									 </p>

								
								 </div>
										</div>
									</div>
								</div>
						</div>
					</div>
				</div>
			</div>
		</div> 

		<div class="footer py-4 d-flex flex-lg-column a-footer">
			<div class="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
				<div class="text-dark order-2 order-md-1"><span class="text-muted fw-bold me-1">2022©</span> <a
						href="https://doardigital.com.br" target="_blank" class="text-gray-800 text-hover-primary">- 
						 Doar digital
						 </a></div>
			</div>
		</div>
 
	</div>
	`,


	data: function () {
		return {
			logo: '',
			mensal: "0",
			amount: "",
			valor: 111111,
			planos_nome: null,
			valor_digitado: null,
			planos_id: null,
			email: "victorfernando@gmail.com",
			outro: null,
			subdomaim: null,
			submitStatus: null,
			minimoalerta: null,

			status: '',
			backgroundColor: '',
			dados: [],
			digitado: "",
			titulo: "",
			temporario : "nuca",
		}
	},
 
	validations: {
		valor_digitado: {
			required,

		},
		valor: {
			required,
		},
		email: {
			required,
			email,
		},

	},
	//

	filters: {
		is_price(price) {
			let amount = (price / 100).toLocaleString('pt-br', { minimumFractionDigits: 2 })
			return `${amount}`
		},

		is_price2(price) {
			let amount = (price / 100).toLocaleString('pt-br', { minimumFractionDigits: 2 })
			return `R$ ${amount}`
		}
	},

	methods: {
		async infoSubdomain() {
			let res = await adm.todoSubdomain(this.subdomaim )
		return res
		},

		setarPlano(jms) {
		
			this.valor = jms.amount
			this.planos_id = jms.id
			this.planos_nome = jms.nome

			this.valor_digitado = "0"
		},


		money() {
			let valor
			valor = this.valor_digitado.replace(/\D/gi, '')
			 valor = (valor/100).toLocaleString('pt-br', { minimumFractionDigits: 2 })
			 this.valor_digitado = valor
		},

		descartavel() {

			let cunston_valor = parseInt(`${this.valor_digitado}`.replace(/\D/gi, ''))

			this.error = null
			this.$v.$touch()
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR'
			}
			else if (cunston_valor != 0 && cunston_valor <= 2499) {
				this.minimoalerta = "Valor minimo deve ser 25,00"
			}
			else {
				//this.valor_digitado = parseInt(`${this.valor_digitado}`.replace(/\D/gi, ''))
				if (this.valor == 0) {

					this.valor_digitado = this.valor_digitado.split('.').join('')

					window.localStorage.setItem("planos_id", "49")
					window.localStorage.setItem("planos_nome", "plano-"+this.valor_digitado)
					this.digitado = this.valor_digitado
					window.localStorage.setItem("amount", this.valor_digitado.split(',00').join(''))
					 window.localStorage.setItem("amountjms", this.valor_digitado)
				} else {
					window.localStorage.setItem("planos_id", this.planos_id)
					window.localStorage.setItem("planos_nome", this.planos_nome)
					window.localStorage.setItem("amount", this.valor.split('00').join(''))
				 	window.localStorage.setItem("amountjms", this.valor)
				}

				window.localStorage.setItem("mensal", this.mensal)
				// window.localStorage.setItem("amount_digitado", this.valor_digitado)
				window.localStorage.setItem("email", this.email)
				window.location.href = "#/finalizar"


			}
		},

	},

	computed: {

		filtraPlano() {
			return this.dados.filter((plano) => {
				return plano.status.match(this.status = 1);

			})
		}
	},

	 

	 

	async mounted() {
	
	//	this.subdomaim = "34edqwe21"
	this.subdomaim = window.location.hostname

	//this.valor_digitado.split('.').join('')

		let config = (await this.infoSubdomain()).dados_instituicao
		this.logo = "https://doardigital.com.br/api/upload/"+config.logo
		this.backgroundColor = config.cor



		this.dados = (await this.infoSubdomain()).dados_instituicao.plano
		this.amount = this.dados.filter(x => x.status == 1)[0].amount

		this.valor_digitado = "0"
		this.valor = this.amount
	},


}

