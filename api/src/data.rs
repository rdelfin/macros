use crate::db::{establish_connection, models::Macro, schema};
use diesel::prelude::*;

pub fn fetch_macro_names() -> Vec<(i32, String)> {
    use schema::macros::dsl::*;

    let connection = establish_connection();
    let results = macros
        .load::<Macro>(&connection)
        .expect("Error loading posts");

    return results.iter().map(|m| (m.id, m.name.clone())).collect();
}
