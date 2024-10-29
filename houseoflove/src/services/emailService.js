import emailjs from '@emailjs/browser';
import axios from 'axios';

export const NotificationService = {
  init() {
    // Initialize with environment variables
    this.emailJsPublicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    this.emailJsServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    this.emailJsTemplateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    this.twilioConfig = {
      accountSid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
      authToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
      phoneNumber: process.env.REACT_APP_TWILIO_PHONE_NUMBER
    };
    this.ownerEmail = process.env.REACT_APP_OWNER_EMAIL;
    this.ownerPhone = process.env.REACT_APP_OWNER_PHONE;
    
    // Initialize EmailJS
    emailjs.init(this.emailJsPublicKey);
  },


  // Send customer order confirmation
  async sendCustomerConfirmation(orderDetails, customerEmail) {
    try {
      await emailjs.send(
        this.emailJsServiceId,
        this.emailJsTemplateId,
        {
          to_email: customerEmail,
          order_number: orderDetails.orderNumber,
          order_total: orderDetails.total,
          order_items: this.formatOrderItems(orderDetails.items),
          customer_name: orderDetails.customerName
        }
      );
      console.log('Customer notification sent successfully');
    } catch (error) {
      console.error('Failed to send customer notification:', error);
      throw error;
    }
  },

  // Send owner notification
  async sendOwnerNotification(orderDetails) {
    try {
      // Send email to owner
      await emailjs.send(
        this.emailJsServiceId,
        this.emailJsTemplateId,
        {
          to_email: this.ownerEmail,
          order_number: orderDetails.orderNumber,
          order_total: orderDetails.total,
          order_items: this.formatOrderItems(orderDetails.items),
          customer_name: orderDetails.customerName,
          customer_email: orderDetails.customerEmail
        }
      );

      // Send SMS via Twilio
      const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${this.twilioConfig.accountSid}/Messages.json`;
      const message = `New order #${orderDetails.orderNumber}! Amount: ${orderDetails.total} KSH from ${orderDetails.customerName}`;
      
      await axios.post(
        twilioEndpoint,
        new URLSearchParams({
          To: this.ownerPhone,
          From: this.twilioConfig.phoneNumber,
          Body: message
        }),
        {
          auth: {
            username: this.twilioConfig.accountSid,
            password: this.twilioConfig.authToken
          }
        }
      );

      console.log('Owner notifications sent successfully');
    } catch (error) {
      console.error('Failed to send owner notification:', error);
      throw error;
    }
  },

  // Helper function to format order items
  formatOrderItems(items) {
    return items.map(item => 
      `${item.name} x${item.quantity} - ${item.price * item.quantity} KSH`
    ).join('\n');
  }
};