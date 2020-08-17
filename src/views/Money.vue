<template>
  <div class="nav-wrapper">
    <div class="content">
      <h1>记账</h1>
      <div class="tags">
        <ul>
          <li>衣</li>
          <li>食</li>
          <li>住</li>
          <li>行</li>
        </ul>
      </div>
      <div class="newTags"></div>
      <div>
        <label class="notes">
          <span class="name">备注</span>
          <input type="text" />
        </label>
      </div>
      <div class="type">
        <ul>
          <li>支出</li>
          <li>收入</li>
        </ul>
      </div>
      <div class="number-pad">
        <div class="output">100</div>
        <div class="buttons">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>+</button>
          <button>---</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>-</button>
          <button>---</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>OK</button>
        </div>
      </div>
    </div>
    <Nav />
  </div>
</template>
<script>
export default {};
</script>
