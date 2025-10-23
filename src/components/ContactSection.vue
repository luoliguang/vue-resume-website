<template>
  <section id="contact" class="section">
    <div class="container">
      <h2 class="section-title">联系方式</h2>
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div class="contact-details">
              <h4>邮箱</h4>
              <p>giluo@vip.qq.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📱</div>
            <div class="contact-details">
              <h4>电话</h4>
              <p>+86 17783386425</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <div class="contact-details">
              <h4>地址</h4>
              <p>广东省惠州市</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">💼</div>
            <div class="contact-details">
              <h4>LinkedIn</h4>
              <p>linkedin.com/in/yourprofile</p>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <h3>发送消息</h3>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <input type="text" v-model="form.name" placeholder="您的姓名" required>
            </div>
            <div class="form-group">
              <input type="email" v-model="form.email" placeholder="您的邮箱" required>
            </div>
            <div class="form-group">
              <textarea v-model="form.message" placeholder="您的消息" rows="5" required></textarea>
            </div>
            <button type="submit" class="submit-btn">发送消息</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  console.log('表单提交:', form)
  alert('消息发送成功！')
  
  // 重置表单
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<style scoped>
.section {
  padding: 80px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 50px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #3498db;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.contact-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  background: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-details h4 {
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.contact-details p {
  color: #666;
  font-size: 1rem;
}

.contact-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.contact-form h3 {
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

.submit-btn {
  background: #3498db;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .contact-form {
    padding: 20px;
  }
}
</style>
