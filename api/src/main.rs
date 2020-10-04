#![feature(proc_macro_hygiene, decl_macro)]

mod data;
mod db;

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate diesel;

use anyhow::Result;
use rocket::{http::Method, response::Stream};
use rocket_contrib::json::JsonValue;
use rocket_cors::{AllowedHeaders, AllowedOrigins, CorsOptions};
use std::io::Cursor;

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

fn main() -> Result<()> {
    let allowed_origins = AllowedOrigins::all();
    let cors = CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post, Method::Delete]
            .into_iter()
            .map(From::from)
            .collect(),
        allowed_headers: AllowedHeaders::all(),
        allow_credentials: true,
        expose_headers: ["Content-Type", "X-Custom"]
            .iter()
            .map(ToString::to_string)
            .collect(),
        max_age: Some(42),
        send_wildcard: false,
        fairing_route_base: "/mycors".to_string(),
        fairing_route_rank: 0,
    }
    .to_cors()?;

    rocket::ignite()
        .attach(cors)
        .mount("/", routes![index, macros, get_macro])
        .launch();

    Ok(())
}
