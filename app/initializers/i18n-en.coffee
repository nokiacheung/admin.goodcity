`import Ember from "ember"`
`import SharedTranslationsEn from "shared.goodcity/initializers/i18n-en"`

I18nTranslationsEn =
  name: "i18n-en"
  initialize: ->

    Ember.I18n.translation_store = Ember.I18n.translation_store || {}

    Ember.I18n.translation_store.en = Ember.$.extend SharedTranslationsEn,
      "reviewing": "Reviewing"
      "expired" : "Expired"
      "reviewed": "Reviewed"
      "scheduled": "Scheduled"
      "finished": "Finished"
      "collection": "Collection"
      "gogovan": "Gogovan"
      "other_deivery": "Other Deivery"
      "messages_title" : "Messages"

      "offer":
        "disable": "Disable"
        "details" : "Offer details"
        "donor_messages" : "Donor Messages"
        "supervisor_messages" : "Supervisors Messages"
        "empty_msg" : "Sorry! This offer is empty."

        "offer_details" :
          "heading" : "Offer Details"
          "is_collection": "Collection"
          "is_drop_off": "Drop-off"
          "is_gogovan_order": "Van ordered"
          "is_gogovan_confirm": "Van confirmed"
          "offer_messages": "General Messages"
          "accepted": "Accepted"
          "not_needed": "Not needed"
          "closed_offer_message": "Offer closed. No items needed, Sorry."

      "items":
        "add_item":
          "description_placeholder" : "What is it? How many items? What's the size?"

      "item":
        "submitted_status": "This item is awaiting review."
        "in_review_status": "This item is being reviewed."
        "accepted_status": "This item has been accepted."
        "rejected_status": "This item has been rejected."

        "messages":
          "info_text1": "If we have questions when reviewing this item we will chat with you here."
          "info_text2": "If you want to add a comment to this item for our reviewers, type it below."

      "inbox":
        "quick_links": "Quick Links"
        "all_offers": "All Offers"
        "notifications": "Notifications"
        "new_offers": "New"
        "new_items" : "New Items"
        "scheduled_offers": "Scheduled"
        "in_review" : "In Progress"
        "my_list" : "My List"
        "finished": "Finished"
        "closed_offers": "Finished"

      "my_notifications":
        "heading" : "{{name}}'s Offer"

      "review_offer":
        "title" : "Review Offer"
        "review_started_by" : "Started by {{firstName}} {{lastName}}"
        "no_items": "No items needed"
        "close_offer": "Close Offer"
        "items_reviewed": "All items reviewed"
        "set_logistics": "Set logistics"
        "to_complete": "to complete"
        "plan_transport": "User to plan transport."
        "reviewed": "Reviewed"
        "start_review": "Start Review"
        "goods_received_by" : "Goods donated by {{firstName}} {{lastName}} received"
        "offer_closed_by": "Offer closed by {{firstName}} {{lastName}}"
        "receive": "Receive"
        "missing": "Missing"
        "received": "Received"
        "expecting": "Expecting"
        "all_items_processed": "All items marked received or missing."

        "donor":
          "district": "District"
          "registered": "Registered"
          "last_seen": "Last seen"
          "total_offers": "Total offers"
          "crm": "CRM"
          "other_offers": "Other Offers on Goodcity"

      "mark_received":
        "delivered_by": "Delivered by:"
        "select": "- select -"
        "gogovan": "Gogovan"
        "crossroads_truck": "Crossroads truck"
        "dropped_off": "Dropped off"
        "close_offer": "Close Offer"
        "unknown": "Unknown"

      "logistics":
        "no_items": "No items to transport."
        "offer_closed": "This offer is closed now."
        "close_offer": "Close Offer"
        "message_donor": "Message Donor"
        "finish_review_request": "Please finish reviewing items first!"
        "accepted_items": "Accepted Items"
        "gogovan_requirement": "Gogovan Reqirement"
        "crossroads_requirement": "Crossroads Requirement"
        "complete_review": "Complete Review"
        "ggv_hire": "Gogovan Hire Requirement"
        "portion_for_crossroads_truck": "What portion of the Crossroads truck will this offer take up?"

      "review_item":
        "title" : "Review Item"
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

      "receive":
        "missing": "Missing"
        "receive": "Receive"

    # this is how we set default language
    Ember.I18n.translations = Ember.I18n.translation_store.en

`export default I18nTranslationsEn`
