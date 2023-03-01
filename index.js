//import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const apiUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = 'cbs33';

Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});//加入全部規則

// 讀取外部的資源(加入多國語系)
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const app = Vue.createApp({
      data() {
        return {
            products:[],
        }
      },
      methods: {
        getProducts() {//取得產品遠端資料
            axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`)
            .then(res => {
             
             this.products = res.data.products;
            })
            .catch((error) => {
              alert(error.response.data.message);
        })

      },
      checkPhone(value) {
        const phoneNumber = /^(09)[0-9]{8}$/   //正則表達式來檢查輸入是否符合台灣手機格式
        return phoneNumber.test(value) ? true : '請輸入手機號碼'
      },
      onSubmit(values) {
        alert(values);           //送出表單
      },
      mounted() {
        this.getProducts();
      },
   }
});


//註冊全域的表單驗證元件（VForm, VField, ErrorMessage）
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);


app.mount('#app');