#[derive(Queryable)]
pub struct Macro {
    pub id: i32,
    pub name: String,
    pub image: Vec<u8>,
}
