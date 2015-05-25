`import Ember from "ember"`
`import SharedTranslationsZhTw from "shared.goodcity/initializers/i18n-zh-tw"`

I18nTranslationsZhTw =
  name: 'i18n-zh-tw'
  initialize: ->

    Ember.I18n.translation_store = Ember.I18n.translation_store || {}
    Ember.I18n.translation_store['zh-tw'] = Ember.$.extend true, SharedTranslationsZhTw,
      "reviewing": "正在審查"
      "reviewed": "已審查完畢"
      "messages_title" : "信息"
      "select": "選擇"
      "search":
        "no_results": "抱歉，未能找到結果"
        "server_search": "於服務器上尋找更多資訊"
        "placeholder": "搜索"

      "offer":
        "disable": 終止"
        "details" : "優惠詳情"
        "donor_messages" : "捐贈者信息"
        "supervisor_messages" : "監察員信息"
        "empty_msg" : "對不起！這項捐獻並不存在。"

        "offer_details" :
          "heading" : "捐贈詳情"
          "is_collection": "收集"
          "is_drop_off": "送抵"
          "is_gogovan_order": "預約貨車"
          "is_gogovan_confirm": "確認貨車"
          "driver_completed": "Driver completed"
          "offer_messages": "一般信息"
          "accepted": "已接受"
          "not_needed": "不需要"
          "closed_offer_message": "不再接收這類物資捐贈，請見諒"
          "received": "已收到"
          "rejected": "已拒絕"
          "pending": "正在等候"
          "missing": "遺失"

      "items":
        "add_item":
          "description_placeholder" : "這是甚麼？有多少樣物件？大小如何？""

      "item":
        "submitted_status": "這項物品正在等候審查。"
        "in_review_status": "正在審查這項物品。"
        "accepted_status": "已接受這項物品。"
        "rejected_status": "不接受這項物品。"
        "cancelled_status": "這項捐贈已被 {{firstName}} {{lastName}} 取消。"

        "messages":
          "info_text1": "假如審查過程中我們遇到任何問題，我們會在下面的對話框向您查詢。"
          "info_text2": "假如您希望添加任何有關捐贈物品的資料，請於下面的對話框輸入。"

      "inbox":
        "quick_links": "快捷鍵"
        "all_offers": "所有捐贈品"
        "notifications": "信息通知"
        "new_offers": "新捐獻項目"
        "new_items" : "新物資"
        "scheduled_offers": "已安排"
        "in_review" : "正在處理"
        "my_list" : "我的列表"
        "finished": "已完成"
        "closed_offers": "已完成"

      "my_notifications":
        "heading" : "{{name}}的捐獻"

      "review_offer":
        "title" : "審查捐獻項目"
        "review_started_by" : "由 {{firstName}} {{lastName}} 發起"
        "no_items": "不需要任何物資"
        "close_offer": "此項捐獻不再開放"
        "items_reviewed": "已審查所有物資"
        "set_logistics": "設定運輸資料"
        "to_complete": "前進完成"
        "plan_transport": "用戶可安排交通"
        "reviewed": "審查完畢"
        "start_review": "開始審查"
        "goods_received_by" : "已經收到由 {{firstName}} {{lastName}} 捐贈的物資"
        "offer_closed_by": "捐贈項目由 {{firstName}} {{lastName}} 關閉"
        "offer_cancelled_by": "捐贈項目由 {{firstName}} {{lastName}} 取消"
        "receive": "收到"
        "missing": "遺失"
        "received": "已經收到"
        "expecting": "正在等候"
        "all_items_processed": "所有項目皆列為已接收或遺失"

        "donor":
          "district": "地區"
          "registered": "已註冊"
          "last_seen": "最後上線"
          "total_offers": "總捐獻"
          "crm": "CRM"
          "other_offers": "所有好人好市捐獻"

      "mark_received":
        "delivered_by": "運送人員："
        "select": "- 選擇 -"
        "gogovan": "Gogovan"
        "crossroads_truck": "十字路會貨車"
        "dropped_off": "親自運送"
        "close_offer": "關閉捐獻項目"
        "unknown": "未知"

      "logistics":
        "no_items": "沒有需要運送的物品"
        "offer_closed": "此項捐獻已經關閉"
        "close_offer": "關閉捐獻項目"
        "message_donor": "向捐贈者發送信息"
        "finish_review_request": "請先完成審查！"
        "accepted_items": "已接受物品"
        "gogovan_requirement": "要求GoGoVan"
        "crossroads_requirement": "要求十字路會運送"
        "complete_review": "完成審查"
        "ggv_hire": "要求租用GoGoVan"
        "portion_for_crossroads_truck": "這項捐獻需要佔用十字路會貨車多少空間運輸？"
        "goods_received" : "物資接收日期"
        "arrange_transport": "安排運輸"

      "review_item":
        "title" : "審查物資"
        "accept" : "接受"
        "accept_item" : "接受物品"
        "reject" : "不接受"
        "reject_item" : "拒絕物品"
        "not_now" : "暫不決定"
        "donor_message" : "捐贈者"
        "supervisor_message" : "監察員"
        "view_lable_guide": "檢閱決定準則"
        "condition": "狀況"
        "add_component": "增加部份"
        "add_item_label": "增加物品標籤"

      "reject":
        "select_type": "請先選取物資類型！"
        "option_error": "請選擇原因"
        "reject_item": "拒絕物品"
        "quality" : "質量"
        "size": "大小"
        "supply": "供應/需求"
        "message_placeholder" : "發送信息予捐贈者，告知物品不被接受"
        "reject_message" : "很抱歉，我們不能接受這項物品。"
        "quality_message" : "對於部份物資類型，除非物資質量極佳，否則我們無法接收。"
        "size_message" : "物資過大，要找到可以安置物資的客戶將很困難。"
        "supply_message" : "很抱歉，由於我們已經有很多同類型的物資，我們無法接受您的捐獻。"
        "cancel_gogovan_confirm": "拒絕接受最後一項物資將會取消GoGoVan的預約，您是否確認？"
        "custom_reason": "特定理由"

      "cancel_gogovan":
        "title": "取消預約GoGoVan"
        "once_confirmed": "GoGoVan確認預約取消後，您即能夠前往拒絕或取消此項捐獻。"
        "call_driver": "請致電GoGoVan以取消預約"
        "notify_donor": "聯絡捐贈者，告知預約已被取消"

      "receive":
        "missing": "遺失"
        "receive": "接收"

      "finished":
        "title": "已完成"
        "received": "已接收"
        "cancelled": "已取消"
        "expired": "已過期"

      "scheduled":
        "title": "已安排時間"
        "other_delivery": "其他運輸"
        "collection" : "收集"
        "gogovan" : "GoGoVan"
        "all_offers": "所有捐獻項目"
        "overdue": "過期"
        "today": "今天"
        "next_week": "下星期"
        "after_next_week": "下星期後"

      "placeholder":
        "qty": "Qty"
        "height": "H"
        "width": "W"
        "length": "L"
        "package_type": "包裝類型"
        "comments": "描述"

`export default I18nTranslationsZhTw`
