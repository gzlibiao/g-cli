class TestClass {
  data() {
    return {
      text: 1
    };
  }

  render() {
    return h("div", "abc1");
  }

  mounted() {
    console.log("com");
    console.log("this.text");
  }
};

export default {
  data() {
    return {
      text: 1
    };
  },
  render() {
    return h("div", "abc1");
  },
  mounted() {
    console.log("com");
    console.log("this.text");
  }
};
