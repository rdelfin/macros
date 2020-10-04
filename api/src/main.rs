#![feature(proc_macro_hygiene, decl_macro)]

mod data;
mod db;

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate diesel;

use rocket::{
    http::{ContentType, Header},
    response::Stream,
};
use rocket_contrib::json::JsonValue;
use std::io::{self, prelude::*, Cursor};

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/macros")]
fn macros() -> JsonValue {
    let macros = data::fetch_macro_names()
        .iter()
        .map(|(id, name)| json!({"id": id, "name": name}))
        .collect::<Vec<_>>();
    json!({ "macros": macros })
}

#[get("/macro/<name>")]
fn get_macro(name: String) -> Stream<Cursor<Vec<u8>>> {
    let image_data = data::fetch_macro_image(&name).expect("Macro not found");
    Stream::chunked(Cursor::new(image_data), 100)
}

fn main() {
    rocket::ignite()
        .mount("/", routes![index, macros, get_macro])
        .launch();
}
