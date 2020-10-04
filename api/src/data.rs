use crate::db::{establish_connection, models::Macro, schema};
use diesel::prelude::*;

pub fn fetch_macro_names() -> Vec<(i32, String)> {
    use schema::macros::dsl::*;

    let connection = establish_connection();
    let results = macros
        .load::<Macro>(&connection)
        .expect("Error loading macros");

    return results.iter().map(|m| (m.id, m.name.clone())).collect();
}

pub fn fetch_macro_image(macro_name: &str) -> Option<Vec<u8>> {
    use schema::macros::dsl::*;

    let connection = establish_connection();
    let results = macros
        .filter(name.eq(macro_name))
        .limit(1)
        .load::<Macro>(&connection)
        .expect("Error loading macros");

    results.get(0).map(|m| m.image.clone())
}
