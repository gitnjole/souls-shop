// main.js
Vue.createApp({
  data() {
    return {
      menu: [],
      cart: [],
      currentPage: 1,
      itemsPerPage: 8,
      filterCategory: null
    };
  },

  mounted() {
    this.fetchJSON();
  },

  computed: {
    filteredMenu() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      if (!this.menu) return [];

      let filteredItems = this.menu;
      if (this.filterCategory) {
        console.log('Filtering by category:', this.filterCategory);
        filteredItems = filteredItems.filter(item => item.category === this.filterCategory);
      }

      return filteredItems.slice(startIndex, endIndex);
    },

    totalPages() {
      if (!this.menu) return 0;

      let filteredItems = this.menu;
      if (this.filterCategory) {
        filteredItems = filteredItems.filter(item => item.category === this.filterCategory);
      }

      const totalItems = filteredItems.length;
      const lastPageSize = totalItems % this.itemsPerPage;

      if (lastPageSize === 0) {
        return totalItems / this.itemsPerPage;
      }

      return Math.floor(totalItems / this.itemsPerPage) + 1;
    }
  },

  methods: {
    async fetchJSON() {
      try {
        const response = await fetch('assets/json/rings.json');
        const data = await response.json();
        this.menu = data;
      } catch (error) {
        console.error('Error fetching ring data: ', error);
      }
    },

    addRing(id) {
      if (this.cart.length < 4) {
        const ring = this.menu.find((ring) => ring.id === id);
        const index = this.cart.findIndex((item) => item.id === id);

        if (index !== -1 && this.cart[index].quantity === 0) {
          this.cart[index].quantity++;
        } else if (index === -1) {
          this.cart.push({ ...ring, quantity: 1 });
        }
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    filterByCategory(category) {
      console.log('Filtering by category: ', category);
      this.filterCategory = category;
      this.currentPage = 1;
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
    }
  }
}).mount('#souls-rings');
