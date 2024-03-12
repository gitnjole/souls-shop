Vue.createApp({
  data(){
      return {
          menu: [
              {
                id: 1,
                image: "Ashen_Estus_Ring.webp",
                name: "ASHEN ESTUS RING",
                weight: 0.8,
                effect: "Increases FP restored with Ashen Estus Flask",
                actualEffect: "Increased the amount of FP restored from drinking from the Ashen Estus Flask by 20%."
              },
              {
                id: 2,
                image: "Chloranthy_Ring_29.webp",
                name: "CHLORANTHY RING",
                weight: 0.7,
                effect: "Raises stamina recovery speed",
                actualEffect: "Stamina regeneration speed increased by 7 points per second."
              },
              {
                id: 3,
                image: "Estus_Ring.webp",
                name: "ESTUS RING",
                weight: 0.8,
                effect: "Increases HP restored with Estus Flask",
                actualEffect: "Increased HP restored by drinking from the Estus Flask by 20%."
              },
              {
                id: 4,
                image: "Havel28DSIII.webp",
                name: "HAVEL'S RING",
                weight: 1.5,
                effect: "Increases maximum load",
                actualEffect: "Increased maximum Equip Load by 15%."
              },
              {
                id: 5,
                image: "Life_Ring_29.webp",
                name: "LIFE RING",
                weight: 0.3,
                effect: "Raises maximum HP",
                actualEffect: "Vigor raised by 7%"
              },
              {
                id: 6,
                image: "Prisoner%27s_Chain.webp",
                name: "PRISONER'S CHAIN RING",
                weight: 0.8,
                effect: "Increases Vigor, Endurance and Vitality, but take more damage.",
                actualEffect: "Increased Vigor, Endurance and Vitality by 5 points each, but reduces the wearer's damage absorption by 4% in all categories."
              },
              {
                id: 7,
                image: "Ring_of_Favor.webp",
                name: "RING OF FAVOR",
                weight: 1.5,
                effect: "Increases HP, stamina, and maximum equip load",
                actualEffect: "Increased maximum HP by 3%, Stamina by 9%, and maximum Equip Load by 5%"
              },
              {
                id: 8,
                image: "Ring_of_Steel_Protection_29.webp",
                name: "RING OF STEEL PROTECTION",
                weight: 0.8,
                effect: "Increases physical damage absorption",
                actualEffect: "Increased Physical damage absorption by 10%, 2% in PvP."
              },
              {
                id: 9,
                image: "Sun_Princess_Ring.webp",
                name: "SUN PRINCESS RING",
                weight: 0.6,
                effect: "Gradually restores HP",
                actualEffect: "Restores 2 HP per second"
                },
            ],

            cart: [

            ]
      }
  },
  methods: {
    addRing(id){
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

    getTotalWeight(){
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
}).mount('#souls-rings')