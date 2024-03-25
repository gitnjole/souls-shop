import RingItem from '.js/components/RingItem.vue';
import ShoppingCart from '.js/components/ShoppingCart.vue';

Vue.createApp({
  components: {
    RingItem,
    ShoppingCart
  },

  data(){
      return {
          menu: [],
          cart: []
      };
  },
  
  mounted() {
    this.fetchJSON();
  },

  methods: {
    async fetchJSON() {
        try {
          const response = await fetch('assets/json/rings.json');
          const data = await response.json();
          this.menu = data;
        } catch (error) {
          console.error('Erorr fetching ring data: ', error);
        }
    },

    addRing(id) {
      if (this.cart.length < 4) {
        const ring = this.menu.find((ring) => ring.id == id)
        const index = this.cart.findIndex((item) => item.id == id);
  
        if(index != -1 && this.cart[index].quantity === 0) {
          this.cart[index].quantity++;
        } else if (index === -1) {
          this.cart.push({...ring, quantity: 1});
        }
      }
    },

    getTotalWeight() {
      var total = 0;

      this.cart.forEach((item) => {
        total += item.weight * item.quantity;
      });

      return total.toFixed(2);
    },

    getTotalEffects() {
      const totalEffects = [];
  
      this.cart.forEach((item) => {
        if (item.actualEffect) {
          totalEffects.push(...item.actualEffect.split('\n'));
        }
      });
  
      return totalEffects;
    },

    reduceItem(id) {
      var item = this.cart.find((item) => item.id == id);

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.cart = this.cart.filter((item) => item.id != id);
      }
    },

    isRingChosen(id) {
      return this.cart.some(item => item.id === id);
    }
  }
}).mount('#souls-rings')