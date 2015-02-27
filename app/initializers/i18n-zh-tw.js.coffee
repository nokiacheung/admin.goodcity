`import Ember from "ember"`

I18nTranslationsZhTw =
  name: 'i18n-zh-tw'
  initialize: ->

    Ember.I18n.translation_store = Ember.I18n.translation_store || {}

    Ember.I18n.translation_store['zh-tw'] =
      "crossroads" : "Crossroads"
      'language': 'zh-tw'
      'loading': '加載中...'
      "goodcity.hk" : "好人好市"
      "skip_intro" : "跳過介紹"
      "next" : "未來"
      "back" : "回"
      "error.message" : "很抱歉, 發生錯誤！"
      "images" : "圖片"
      "delete" : "刪除"
      "edit" : "編輯"
      "remove" : "刪除"
      "yes" : "是啊"
      "no" : "無"
      "ok" : "行"
      "index.title" : "十字路口基金會禮物"
      "index.donate_goods" : "捐出你的精品給需要的人"
      "index.how" : "Learn How"
      "index.start" : "Start Now"
      "full_name" : "{{lastName}} {{firstName}}"
      "select_district" : "Select a district"

      "application":
        "home" : "首頁"
        "all_offers" : "所有優惠"
        "login" : "登入"
        "logout" : "註銷"
        "register" : "報名"
      "authenticate":
        "input_code" : "輸入代碼"
      "districts":
        "all" : "所有"
      "contact":
        "title" : "Contact Details"
        "confirm_location" : "Who should we call to confirm location & address detail?"
        "name" : "Name"
        "phone" : "Phone"
        "address" : "Collection address (Hong Kong)"
        "street" : "Street"
        "building" : "Building"
        "flat" : "Flat"
        "done" : "Done"

      "tour":
        "step1.title" : "1. Photograph & describe"
        "quality_items" : "quality items."
        "we_receive" : "What we receive."
        "step2.title" : "2. Submit for live review"
        "chat_questions" : "We'll chat if we have questions"
        "step3.title" : "3. Arrange transport"
        "accepted_items" : "for accepted items."
        "quick_easy" : "Quick & easy"
        "step4.title" : "4. People are helped"
        "make_goodcity" : "How you're making a Good City."
        "faq" : "Frequently Asked Questions"

      "offer":
        "details" : "优惠详情"

        "offer_details" :
          "heading" : "Offer Details"
          "is_collection": "Collection"
          "is_drop_off": "Drop-off"
          "is_gogovan": "Van Booked"
          "offer_messages": "General Messages"
          "accepted": "Accepted"
          "not_needed": "Not needed"
          "closed_offer_message": "Offer closed. No items needed, Sorry."

        "transport_details" :
          "accepted_items": "Accepted items to be transported"
          "time": "Booking Time"
          "name": "Contact Name"
          "phone": "Contact Phone"
          "address": "Address"
          "district": "District"
          "charity_sale": "Charity sale ok?"
          "modify": "Modify"
          "cancel_booking": "Cancel Booking"

      "items":
        "add_item":
          "description_placeholder" : "What is it? How many items? What's the size?"

      "item":
        "item_details" : "項詳情:"
        "donor_description": "說明: {{donorDescription}}"
        "submitted_status": "This item is awaiting review."
        "in_review_status": "This item is being reviewed."
        "accepted_status": "This item has been accepted."
        "rejected_status": "This item has been rejected."

      "_resend":
        "no_sms" : "沒有收到短信代碼?"
        "please_wait" : "請請等待5分鐘..."
        "resend" : "再次發送"

      "_verification_pin":
        "input_code" : "Input 4-digit SMS code we just sent you:"
        "auth_error" : "Sorry! Please enter the correct pin."

      "login":
        "hk_only" : "Mobile phone # (Hong Kong only)"
        "login" : "Login"
        "smscode": "Get 4-digit SMS code"

      "register":
        "hk_only" : "Mobile phone # (Hong Kong only)"
        "given_name" : "Given name"
        "family_name" : "Family name"
        "districts" : "Districts"
        "register" : "Register"
        "login" : "Login"

      "inbox":
        "title" : "New Offers"
        "new_items" : "New Items"
        "unread_messages" : "Unread Messages: {{unreadMessagesCount}}"
        "in_review" : "In Review"
        "my_list" : "My List"
        "my_offers" : "My Offers"
        "reviewed_offers": "Reviewed Offers"
        "scheduled_offers": "Scheduled Offers"
        "closed_offers": "Closed Offers"

      "messages":
        "unread" : "Unread ({{unreadCount}})"
        "owner" : "You"

      "notifications":
        "text" : "{{text}}"
        "view": "View"

      "review_item":
        "accept" : "Accept"
        "accept_item" : "Accept Item"
        "reject" : "Reject"
        "reject_item" : "reject Item"
        "not_now" : "Not Now"
        "donor_message" : "Donor"
        "supervisor_message" : "Supervisors"
        "view_lable_guide": "View labeling guide"
        "condition": "Condition"
        "add_component": "Add component"

      "reject":
        "select_type": "Please choose Item Type first!"
        "option_error": "Please choose a reason."
        "reject_item": "Reject Item"
        "quality" : "Quality"
        "size": "Size"
        "supply": "Supply/Demand"
        "message_placeholder" : "Message to donor about the rejection of this item"
        "reject_message" : "Unfortunately we cannot receive this item. "
        "quality_message" : "Some categories of items are very difficult for us to distribute unless they are in excellent condition."
        "size_message" : "Very few of our clients are able to accommodate large items in their homes."
        "supply_message" : "Unfortunately we cannot receive this item because we have a large quantity already in stock."

      "review_offer":
        "review_started_by" : "Started by {{lastName}} {{firstName}}"
        "no_items": "No items needed"
        "close_offer": "Close Offer"
        "items_reviewed": "All items reviewed"
        "set_logistics": "Set logistics"
        "to_complete": "to complete"
        "plan_transport": "User to plan transport."
        "reviewed": "Reviewed"
        "start_review": "Start Review"
        "goods_received_by" : "Goods received by {{lastName}} {{firstName}}"
        "offer_closed_by": "Offer closed by {{lastName}} {{firstName}}"

      "logistics":
        "no_items": "No items to transport."
        "offer_closed": "This offer is closed now."
        "close_offer": "Close Offer"
        "message_donor": "Message Donor"
        "finish_review_request": "Please finish reviewing items first!"
        "accepted_items": "Accepted Items"
        "gogovan_requirement": "Gogovan Reqirement"
        "crossroads_requirement": "Crossroads Requirement"

`export default I18nTranslationsZhTw`
