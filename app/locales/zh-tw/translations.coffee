`import Ember from "ember"`
`import SharedTranslationsZhTw from "shared-goodcity/locales/zh-tw/translations"`

I18nTranslationsZhTw =
  Ember.$.extend true, SharedTranslationsZhTw,
    "socket_offline_error": "正在嘗試連線…"
    "reviewing": "正在審查"
    "reviewed": "已審查完畢"
    "submitted": "已提交"
    "messages_title" : "信息"
    "select": "選擇"
    "search":
      "no_results": "抱歉，未能找到結果"
      "server_search": "於服務器上尋找更多資訊"
      "placeholder": "搜索"

    "offer":
      "title": "捐獻細節"
      "donor": "捐贈者"
      "logistics": "運送詳情"
      "details" : "捐獻詳情"
      "donor_messages" : "捐贈者信息"
      "supervisor_messages" : "監察員信息"
      "empty_msg" : "對不起！這項捐獻並不存在。"

      "merge":
        "title": "Select offer to merge with"
        "message": "Merging offers cannot be undone. All data will be retained except general discussion messages on the offer you just selected."
        "cancel": "Cancel"
        "merge": "Merge"
        "error": "These offers can not be merged."

      "offer_details" :
        "heading" : "捐贈詳情"
        "is_collection": "收集"
        "is_drop_off": "送抵"
        "is_gogovan_order": "預約貨車"
        "is_gogovan_confirm": "確認貨車"
        "driver_completed": "司機已確認預約"
        "offer_messages": "一般信息"
        "accepted": "已接受"
        "not_needed": "不需要"
        "closed_offer_message": "不再接收這類物資捐贈，請見諒"
        "received": "已收到"
        "rejected": "已拒絕"
        "pending": "正在等候"
        "missing": "遺失"
        "start_receiving_by": "Start receiving by {{firstName}} {{lastName}}"

    "items":
      "add_item":
        "description_placeholder" : "這是甚麼？有多少件物資？物資大小？"

    "item":
      "submitted_status": "這項物品正在等候審查。"
      "in_review_status": "正在審查這項物品。"
      "accepted_status": "已接受這項物品。"
      "rejected_status": "不接受這項物品。"
      "cancelled_status": "這項捐贈已被 {{lastName}} {{firstName}} 取消。"

      "messages":
        "info_text1": "假如審查過程中我們遇到任何問題，我們會在下面的對話框向您查詢。"
        "info_text2": "假如您想添加任何有關捐贈物品的資料，請於下面的對話框輸入。"

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
      "receiving": "Receiving"
      "users": "Users"

    "my_notifications":
      "heading" : "{{name}}的捐獻"
      "all_notifications" : "All notifications"
      "show_unread" : "Show unread only"
      "mark_all_read" : "Mark all read"
      "no_unread": "No unread messages!"

    "review_offer":
      "title" : "審查捐獻項目"
      "review_started_by" : "由 {{lastName}} {{firstName}} 發起"
      "no_items": "不需要任何物資"
      "close_offer": "此項捐獻不再開放"
      "items_reviewed": "已審查所有物資"
      "set_logistics": "設定運輸資料"
      "to_complete": "以完成"
      "plan_transport": "用戶可安排交通"
      "reviewed": "審查完畢"
      "start_review": "開始審查"
      "goods_received_by" : "已經收到由 {{firstName}} {{lastName}} 捐贈的物資"
      "goods_start_receiving_by": "{{firstName}} {{lastName}} began receiving items"
      "offer_closed_by": "捐贈項目由 {{firstName}} {{lastName}} 關閉"
      "offer_cancelled_by": "捐贈項目由 {{firstName}} {{lastName}} 取消"
      "receive": "收到"
      "missing": "遺失"
      "received": "已經收到"
      "expecting": "等候中"
      "all_items_processed": "所有項目皆被接收或列作遺失"
      "inactive_offer": "This offer is marked as inactive."
      "message_donor": "Send message to donor about closing offer:"
      "receive_offer_message": "Your offer was received, thank you."
      "missing_offer_message": "The delivery arrived at Crossroads but expected items were missing. We may follow up with you to confirm what happened."

      "donor":
        "offer_id": "Offer ID"
        "district": "地區"
        "registered": "已註冊"
        "last_seen": "最後上線"
        "total_offers": "捐獻總數"
        "crm": "CRM"
        "other_offers": "所有好人好市捐獻"
        "internet_call": "Internet Call"
        "end_call": "End Call"

      "options":
        "add_item": "Add an item"
        "delete_offer": "Delete Offer"
        "submit_offer": "Re-submit Offer"

    "mark_received":
      "delivered_by": "運送人員："
      "gogovan": "Gogovan"
      "crossroads_truck": "十字路會貨車"
      "dropped_off": "親自運送"
      "unknown": "未知"

    "logistics":
      "no_items": "沒有需要運送的物品"
      "offer_closed": "此項捐獻已經關閉"
      "close_offer": "關閉捐獻項目"
      "message_donor": "向捐贈者發送信息"
      "finish_review_request": "請先完成審查！"
      "accepted_items": "已接受物品"
      "gogovan_requirement": "要求GoGoVan運送"
      "crossroads_requirement": "要求十字路會運送"
      "complete_review": "完成審查"
      "ggv_hire": "要求租用GoGoVan"
      "portion_for_crossroads_truck": "這項捐獻需要佔用十字路會貨車多少空間？"
      "goods_received" : "物資接收日期"
      "arrange_transport": "安排運輸"
      "van": "麵包車"
      "receiving" : "This offer is currently being received."
      "offer_cancelled_by": "Offer cancelled by {{lastName}} {{firstName}}"

    "review_item":
      "title" : "審查物資"
      "accept" : "接受"
      "save_item": "儲存"
      "accept_item" : "儲存及接受"
      "reject" : "不接受"
      "reject_item" : "拒絕物品"
      "not_now" : "暫不決定"
      "donor_message" : "捐贈者信息"
      "supervisor_message" : "監察員信息"
      "view_lable_guide": "檢閱決定準則"
      "condition": "狀況"
      "add_component": "增加配件"
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
      "size_message" : "物資過大，要找到可以安置物資的客戶會很困難。"
      "supply_message" : "很抱歉，由於我們已經有很多同類型的物資，我們無法接受您的捐獻。"
      "cancel_gogovan_confirm": "拒絕接受最後一項物資將會取消GoGoVan的預約，您是否確認？"
      "custom_reason": "特別原因"

    "cancel_gogovan":
      "title": "取消預約GoGoVan"
      "once_confirmed": "GoGoVan確認預約取消後，您便能夠前往拒絕或取消此項捐獻。"
      "call_driver": "請致電GoGoVan以取消預約"
      "notify_donor": "聯絡捐贈者，告知預約已被取消"

    "receive":
      "missing": "遺失"
      "receive": "接收"
      "inventory": "Inventory"
      "receiving":
        "header": "Begin Receiving Offer"
        "cant_modify_note": "Note: Putting an offer in the \"receiving\" state cannot be undone. Donors cannot modify their offer once you start receiving the items."
        "not_now": "Not Now"
        "begin_receiving": "Begin Receiving"


    "finished":
      "title": "已完成"
      "received": "已接收"
      "cancelled": "已取消"
      "inactive": "Inactive"

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
      "qty": "數量"
      "height": "高度"
      "width": "闊度"
      "length": "長度"
      "package_type": "包裝類型"
      "comments": "描述"

    "receive_package":
      "inventory": "Inventory Number"
      "invalid_inventory": "Inventory number is invalid."
      "invalid_quantity": "Quantity can not be blank."
      "invalid_description": "Description can not be blank."
      "receive": "Receive"
      "cancel": "Cancel"

    "user":
      "permission": "Permission"

    "inactive_offer":
      "message": "This offer seems to be inactive. Please feel free to modify, re-submit or cancel it."
      "add_message": "Add message for donor"
      "mark_inactive": "Mark Inactive"

    "cancel_offer":
      "donor_message": "Choose why the donor wishes to cancel this offer."
      "cancel": "Cancel Offer"

`export default I18nTranslationsZhTw`
