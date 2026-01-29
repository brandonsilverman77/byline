# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_06_143224) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_trgm"
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "uid"
    t.string "title"
    t.string "description"
    t.string "body"
    t.string "link"
    t.bigint "domain_id"
    t.bigint "feed_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "published_at"
    t.index ["domain_id"], name: "index_articles_on_domain_id"
    t.index ["feed_id"], name: "index_articles_on_feed_id"
    t.index ["uid"], name: "index_articles_on_uid", unique: true
  end

  create_table "author_articles", force: :cascade do |t|
    t.bigint "author_id"
    t.bigint "article_id"
    t.index ["article_id"], name: "index_author_articles_on_article_id"
    t.index ["author_id"], name: "index_author_articles_on_author_id"
  end

  create_table "author_categories", force: :cascade do |t|
    t.bigint "author_id"
    t.bigint "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_author_categories_on_author_id"
    t.index ["category_id"], name: "index_author_categories_on_category_id"
  end

  create_table "authors", force: :cascade do |t|
    t.string "name"
    t.string "bio"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "twitter_id"
    t.string "twitter_handle"
    t.string "twitter_profile_image_url"
    t.boolean "featured", default: false
    t.index ["name"], name: "authors_on_name_idx", opclass: :gin_trgm_ops, using: :gin
    t.index ["name"], name: "index_authors_on_name", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "domains", force: :cascade do |t|
    t.string "host"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "email_send_articles", force: :cascade do |t|
    t.bigint "email_send_id"
    t.bigint "article_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_email_send_articles_on_article_id"
    t.index ["email_send_id"], name: "index_email_send_articles_on_email_send_id"
  end

  create_table "email_sends", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_email_sends_on_user_id"
  end

  create_table "feeds", force: :cascade do |t|
    t.string "url"
    t.datetime "fetched_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_authors", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_user_authors_on_author_id"
    t.index ["user_id"], name: "index_user_authors_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.integer "permission_level"
    t.integer "status", default: 1
  end

end
