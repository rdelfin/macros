#![feature(proc_macro_hygiene, decl_macro)]

mod data;
mod db;

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate diesel;

use rocket_contrib::json::JsonValue;

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

fn main() {
    rocket::ignite().mount("/", routes![index, macros]).launch();
}
